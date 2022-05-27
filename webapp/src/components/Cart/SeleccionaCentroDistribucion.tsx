import { Card, makeStyles } from "@material-ui/core";
import { Box, Button, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDistribuidores } from "../../api/api";
import { Distribuidor } from "../../shared/shareddtypes";
import GetGastosDeEnvio, { Comprar } from "./GastosDeEnvio";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


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

  const [distribuidores, setDistribuidores] = useState([] as Distribuidor[]);

  // recuperar distribuidores de la base de datos
  const loadDistribuidores = async () => {
    setDistribuidores(await getDistribuidores());
  }
  useEffect(() => {
    loadDistribuidores();
  }, []);


  return (
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

              {/* Comprar */}
              <Button variant="contained" endIcon={<ShoppingCartIcon />} size="large" onClick={Comprar} href={window.location.protocol + '//' + window.location.host + '/'}>Comprar</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Box>
  );

}
export default SeleccionaCentroDistribucion;