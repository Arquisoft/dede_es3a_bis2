import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FavoriteBorder } from "@mui/icons-material";
import { Box, Typography } from '@mui/material';
import TableSizes from './TableSizes';
import { TypeProduct } from '../../shared/shareddtypes';

const tallas = [
  <Button sx={{ bgcolor: 'black', color: '#FFFFFF'}}>36</Button>,
  <Button sx={{ bgcolor: 'black', color: '#FFFFFF'}}>37</Button>,
  <Button sx={{ bgcolor: 'black', color: '#FFFFFF'}}>38</Button>,
  <Button sx={{ bgcolor: 'black', color: '#FFFFFF'}}>39</Button>,
  <Button sx={{ bgcolor: 'black', color: '#FFFFFF'}}>40</Button>,
]

const colores = [
  <Button  sx={{ bgcolor: '#FFFFFF', color: 'black'}}>Blanco</Button>,
  <Button  sx={{ bgcolor: '#FFFFFF', color: 'black'}}>Negro</Button>,
]

type parsedProduct = {
  product: TypeProduct[];
};
 
const RightDetails = (parsed:parsedProduct) => {
  
  function addToCart(){
    const item = {"_objectId":parsed.product[0]._objectId,"id":parsed.product[0].id,"nombre":parsed.product[0].nombre,"precio":parsed.product[0].precio,"imagen":parsed.product[0].imagen};
    var cart:string = sessionStorage.getItem('cart') as string;
    if(JSON.parse(cart).length > 0){
      var newCart:string = cart.substring(0, cart.length-1) + ',' + JSON.stringify(item) + ']';
    } else{
      var newCart:string = cart.substring(0, cart.length-1) + JSON.stringify(item) + ']';
    }
    sessionStorage.setItem('cart', newCart);
    alert("Artículo: \"" + parsed.product[0].nombre + "\" añadido al carrito.");
  }

  return (
    <Box sx={{ '& button': { m: 2 } }} >
      <div>
      <Typography gutterBottom variant="h3" color= "#FFFFFF">
           {parsed.product[0].nombre}
      </Typography>
      <Typography gutterBottom variant="h4" color= "#FFFFFF">
           {parsed.product[0].descripcion}
      </Typography>
      <Typography gutterBottom variant="h6" color= "#FFFFFF">
           {parsed.product[0].precio}
      </Typography>
      </div>

      <div>
	      <Typography color= "#FFFFFF">
           Colores
        </Typography>
        <ButtonGroup variant="outlined" aria-label="colores">
           {colores}
        </ButtonGroup>
      </div>

      <div>
	      <Typography color= "#FFFFFF">
           Tallas disponibles
        </Typography>
        <ButtonGroup color= "primary" variant="outlined" aria-label="tallas">
           {tallas}
        </ButtonGroup>
      </div>

      <div>
        <Button 
        variant="contained" 
        startIcon={<FavoriteBorder />} 
        size="medium"
        sx={{ bgcolor: '#FFFFFF', color: 'black'}}>
            Favorito
         </Button>

        <Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ bgcolor: 'black' }} onClick={addToCart}>
           Añadir al carrito
         </Button>
      </div>

      <div>
        <TableSizes/>
      </div>
    </Box>
  );
};
export default RightDetails;