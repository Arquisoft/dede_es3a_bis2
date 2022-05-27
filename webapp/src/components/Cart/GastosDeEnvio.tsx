import { VCARD } from "@inrupt/lit-generated-vocab-common";
import { getSolidDataset, getStringNoLocale, getThing, getUrl, Thing } from "@inrupt/solid-client";
import React, { useEffect } from "react";
import { CalcularGastos } from "./DireccionEnvio";
import { Distribuidor, Pedido, TypeProduct } from "../../shared/shareddtypes";
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from '@inrupt/solid-ui-react';
import { añadirPedido } from "../../api/api";

const useStyles = makeStyles({
    sizes: {
        marginLeft: '20%',
        marginTop: '20%',
        marginBottom: '20%',
        width: '60%',
        height: '80%',
        "&:hover ": {
            transform: "scale3d(1.05, 1.05, 1)",
            boxShadow: "-1px 1px 20px 0px rgba(0,0,0,0.9)",
        }
    },
    colores: {
        color: '#000000'
    },
    container: {
        position: 'relative'
    },
    margen: {
        margin: '-25px 0 0 -25px',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
    }
});

// el webId es session.info
async function GetDireccionUsuario(webId: string): Promise<string> {
    let perfilURI = webId.split("#")[0];
    let dataSet = await getSolidDataset(perfilURI);
    let perfil = getThing(dataSet, webId);
    let hasAddress = getUrl(perfil as Thing, VCARD.hasAddress) as string;
    let addressUsuario = await getThing(dataSet, hasAddress);


    let calle = getStringNoLocale(addressUsuario as Thing, VCARD.street_address) as string;
    let localidad = getStringNoLocale(addressUsuario as Thing, VCARD.locality) as string;
    let codigoPostal = getStringNoLocale(addressUsuario as Thing, VCARD.postal_code) as string;
    let region = getStringNoLocale(addressUsuario as Thing, VCARD.region) as string;
    let pais = getStringNoLocale(addressUsuario as Thing, VCARD.country_name) as string;

    let direccionUsuario = calle + " " + localidad + " " + codigoPostal + " " + region + " " + pais;
    return direccionUsuario;
}

async function GetGastosDeEnvio(distribuidor: Distribuidor, webId: string): Promise<number> {

    // recuperamos la direccion del usuario
    const direccionUsuario = await GetDireccionUsuario(webId);

    // calculamos los gastos de envio a esa direccion
    const gastosDeEnvio = await CalcularGastos(direccionUsuario, distribuidor);

    return gastosDeEnvio;
}

export default GetGastosDeEnvio;

export function Comprar(webId:string, costeConGastos: number) {
    if (JSON.parse(sessionStorage.getItem('cart') as string).length > 0) {
        // crear pedido
        const cart = JSON.parse(sessionStorage.getItem('cart') as string);
        const productos: Array<string> = cart.map((producto: TypeProduct) => producto.nombre);
        // seleccionar nombre producto
        const pedido: Pedido = { usuario: webId!!, precio: costeConGastos, contenido: productos };
        añadirPedido(pedido);
        // vaciar carrito
        sessionStorage.setItem('cart', JSON.stringify([]));

        sessionStorage.setItem(webId!!.split('#')[0], JSON.stringify([]));
        alert("Usted ha realizado la compra. Se procederá al envío correspondiente.");
        // window.location.reload();
    }
}

