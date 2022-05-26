import { VCARD } from "@inrupt/lit-generated-vocab-common";
import { getSolidDataset, getStringNoLocale, getThing, getUrl, Thing } from "@inrupt/solid-client";
import { Button, Card, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { calcularGastos } from "./DireccionEnvio";
import { Distribuidor } from "../../shared/shareddtypes";
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from '@inrupt/solid-ui-react';

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
async function getDireccionUsuario(webId: string): Promise<string> {
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


function GetGastosDeEnvio(distribuidor: Distribuidor): Number {
    const classes = useStyles();
    const { session } = useSession();
    const [direccionUsuario, setDireccionUsuario] = React.useState<string>("");
    const [gastosDeEnvio, setGastosDeEnvio] = React.useState<Number>(0);

    // recuperamos la direccion del usuario
    const getDireccion = async () => setDireccionUsuario(await getDireccionUsuario(session.info.webId!!));

    const calcular = async () => {
        // calculamos los gastos de envio a esa direccion
        let gastosDeEnvio = await calcularGastos(direccionUsuario, distribuidor);
        setGastosDeEnvio(gastosDeEnvio);
        costeConGastos = gastosDeEnvio;
    };

    useEffect(() => {
        getDireccion();
        calcular();
    });

    return gastosDeEnvio;
    // return (
    //     <Container>
    //         <div className={classes.margen}>
    //             <Card>
    //                 <Typography variant="h5">
    //                     Precio total (+ gastos): {gastosDeEnvio} €
    //                 </Typography>
    //             </Card>

    //             <Button variant="contained" endIcon={<ShoppingCartIcon />} size="large" onClick={comprar} href={window.location.protocol + '//' + window.location.host + '/'}>
    //                 Comprar
    //             </Button>
    //         </div>
    //     </Container>
    // );
}
export default GetGastosDeEnvio;

function comprar() {
    if (JSON.parse(sessionStorage.getItem('cart') as string).length > 0) {
        // crear pedido

        // seleccionar nombre producto

        // vaciar carrito
        sessionStorage.setItem('cart', JSON.stringify([]));
        alert("Usted ha realizado la compra. Se procederá al envío correspondiente.");
        // window.location.reload();
    }
}

