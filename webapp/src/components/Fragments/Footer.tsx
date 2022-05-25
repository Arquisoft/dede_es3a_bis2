import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  stickToBottom: {
    backgroundColor: '#000000',
    background: "linear-gradient(45deg, #000000 30%, #FFFFFF 70%)",
    marginTop: '1rem',
    padding: '1rem',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    textAlign: 'center'
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.stickToBottom}>
      <Typography variant='h6' >
        @dede_es3a_bis2
      </Typography>
    </div>
  );
};
export default Footer;