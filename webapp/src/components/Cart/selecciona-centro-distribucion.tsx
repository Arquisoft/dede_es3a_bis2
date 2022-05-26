import { makeStyles } from "@material-ui/core";

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

  export default function selecciona_centro_distribucion(){
    const classes = useStyles();

  }