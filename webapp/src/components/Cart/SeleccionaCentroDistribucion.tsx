import { Card, makeStyles } from "@material-ui/core";
import { Box, Button, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDistribuidores } from "../../api/api";
import { Distribuidor } from "../../shared/shareddtypes";
import GetGastosDeEnvio, { Comprar } from "./GastosDeEnvio";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { VCARD } from "@inrupt/lit-generated-vocab-common";
import { getSolidDataset, getThing, getUrl, Thing, getStringNoLocale } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import React from "react";
import { CalcularGastos } from "./DireccionEnvio";
import Nav from "../Fragments/Nav";
import { useNavigate } from 'react-router-dom';


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

const SeleccionaCentroDistribucion = () => {
  const classes = useStyles();
  const { session } = useSession();
  const nav = useNavigate();

  const [distribuidores, setDistribuidores] = useState([] as Distribuidor[]);

  // recuperar distribuidores de la base de datos
  const loadDistribuidores = async () => {
    const distribuidores = await getDistribuidores();
    for (let dist of distribuidores) {
      let gastos:number = await GetGastosDeEnvio(dist, session.info.webId!!);
      dist.gastos = gastos;
    }

    setDistribuidores(distribuidores);
  }
  useEffect(() => {
    loadDistribuidores();
  }, []);

  const HacerComprar = (dis:Distribuidor) => {
    Comprar(session.info.webId!!, dis.gastos);
    nav('/Requests');
  }


  return (
    <div>
      <Nav />
      <Box>
        <div>
          <Typography variant="h3" color="#FFFFFF">
            <b>DISTRIBUIDORES DISPONIBLES</b>
          </Typography>

          {distribuidores.map((dis: Distribuidor) =>
            <Card className={classes.sizes} key={dis.nombre}>
              <CardContent>
                {/* mostrar nombre de cada distribuidor */}
                <Typography variant="h6">
                  <b>{dis.nombre}</b>
                </Typography>
                {/* mostrar gastos de envío de cada distribuidor */}
                <Typography variant='h6'>
                  Precio + Gastos de envío: {dis.gastos} €
                </Typography>
                {/* Comprar */}
                <Button variant="contained" endIcon={<ShoppingCartIcon />} size="large" onClick={() => HacerComprar(dis)}>Comprar</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Box>
    </div>

  );

}
export default SeleccionaCentroDistribucion;