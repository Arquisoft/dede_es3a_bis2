import * as React from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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

  },
  carritoVacio: {
    position: 'fixed',
    marginTop: '15%',
    marginBottom: '15%',
    marginRight: '50%',
    marginLeft: '50%'
  }
});

function FinishBuying() {
  if (JSON.parse(sessionStorage.getItem('cart') as string).length > 0) {
    sessionStorage.setItem('cart', JSON.stringify([]));
    alert("Compra realizada");
    window.location.reload();
  }
}

export default function CartButons() {
  const classes = useStyles();

  // ruta de redirección según estado
  let rutaFinalizarCompra: string;

  if (sessionStorage.getItem('user') != null) {
    // el usuario Sí ha iniciado sesión
    rutaFinalizarCompra = '/FormLogIn'; // log de POD
  } else {
    // el usuario NO ha iniciado sesión
    rutaFinalizarCompra = '/LogInPassword'; // tiene que iniciar sesión
  }

  return (
    <Container maxWidth='lg' className={classes.container}>
      <div className={classes.margen}>
        {calcularPrecioSinGastos() > 0 ? (
          <>
            <Card>
              <Typography variant='h5'>
                {/* el precio es mayor que 0 (no está vacío), se calcula */}
                Precio sin gastos de envío: {calcularPrecioSinGastos()} €
              </Typography>
            </Card>
            <Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ bgcolor: 'black' }} size='large' to={rutaFinalizarCompra} component={Link}>
              LogIn para Finalizar Compra
            </Button>
          </>
        ) : ([
          <Card className={classes.carritoVacio}>
            <Typography variant="h5">
              {/* el carrito está vacío, no hay nada que calcular */}
              Tu carrito de compra está vacío
            </Typography>
          </Card>
        ])
        }
      </div>
    </Container>
  );
}

function calcularPrecioSinGastos(): number {
  let precioFinal = 0;
  let precioFinalString = "";

  if (JSON.parse(sessionStorage.getItem('cart') as string) != null) {
    if (JSON.parse(sessionStorage.getItem('cart') as string).length > 0) {
      let carrito: string = sessionStorage.getItem('cart') as string;
      let primero = carrito.split("},{");
      let i: number;
      for (i = 0; i < primero.length; i++) {
        let [objectId, id, nombre, precio, imagen] = primero[i].split(',');
        let [pr, valor] = precio.split(':');
        precioFinal += Number(valor);
      }
      precioFinalString = String(precioFinal);
    }
    sessionStorage.setItem('precioFinal', precioFinalString);
    return precioFinal;
  }
  return precioFinal;
}