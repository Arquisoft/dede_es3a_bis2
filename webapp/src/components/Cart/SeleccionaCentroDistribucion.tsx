import { Card, makeStyles } from "@material-ui/core";
import { Box, Button, ButtonGroup, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getDistribuidores } from "../../api/api";
import { Distribuidor } from "../../shared/shareddtypes";

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
        <Typography variant="h5" color="#FFFFFF">
          DISTRIBUIDORES DISPONIBLES
        </Typography>

        {distribuidores.map(dis =>
          <Card className={classes.sizes}>
            <CardContent>
              <Typography variant="h6">
                {dis.nombre}
              </Typography>
            </CardContent>
          </Card>
        )}


      </div>
    </Box>
  );

}
export default SeleccionaCentroDistribucion;