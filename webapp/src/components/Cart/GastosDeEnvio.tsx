import { VCARD } from "@inrupt/lit-generated-vocab-common";
import { getSolidDataset, getStringNoLocale, getThing, getUrl, Thing } from "@inrupt/solid-client";
import { Card, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { CalcularGastos } from "./DireccionEnvio";
import { Distribuidor, Pedido, TypeProduct } from "../../shared/shareddtypes";
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from '@inrupt/solid-ui-react';
import { añadirPedido } from "../../api/api";
import { Session } from "@inrupt/solid-client-authn-browser";

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

let costeConGastos: number = 0;

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


function GetGastosDeEnvio(distribuidor: Distribuidor): number {
    const classes = useStyles();
    const { session } = useSession();
    const [direccionUsuario, setDireccionUsuario] = React.useState<string>("");
    const [gastosDeEnvio, setGastosDeEnvio] = React.useState<number>(0);

    // recuperamos la direccion del usuario
    const getDireccion = async () => setDireccionUsuario(await GetDireccionUsuario(session.info.webId!!));

    const calcular = async () => {
        // calculamos los gastos de envio a esa direccion
        let gastosDeEnvio = await CalcularGastos(direccionUsuario, distribuidor);
        setGastosDeEnvio(gastosDeEnvio);
        costeConGastos = gastosDeEnvio;
    };

    useEffect(() => {
        getDireccion();
        calcular();
    });

    return gastosDeEnvio;
    // return(
    //     <Container>
    //         <div className={classes.margen}>
    //             <Card>
    //                 <Typography variant="h6">
    //                     Precio total (gastos de envío incluidos): {gastosDeEnvio} €
    //                 </Typography>
    //             </Card>
    //         </div>
    //     </Container>
    // );
}
export default GetGastosDeEnvio;

export function Comprar() {
    const { session } = useSession();
    if (JSON.parse(sessionStorage.getItem('cart') as string).length > 0) {
        // crear pedido
        const cart = JSON.parse(sessionStorage.getItem('cart') as string);
        const productos: Array<string> = cart.map((producto: TypeProduct) => producto.nombre);
        // seleccionar nombre producto
        const pedido: Pedido = { usuario: (sessionStorage.getItem('user') as string), precio: costeConGastos, contenido: productos };
        añadirPedido(pedido);
        // vaciar carrito
        sessionStorage.setItem('cart', JSON.stringify([]));
        
        sessionStorage.setItem(session.info.webId!!.split('#')[0], JSON.stringify([]));
        alert("Usted ha realizado la compra. Se procederá al envío correspondiente.");
        // window.location.reload();
    }
}

