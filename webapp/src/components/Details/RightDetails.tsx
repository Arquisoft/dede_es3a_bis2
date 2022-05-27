import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FavoriteBorder } from "@mui/icons-material";
import { Box, Typography } from '@mui/material';
import TableSizes from './TableSizes';
import { Talla, TypeProduct } from '../../shared/shareddtypes';
import { getTallas } from '../../api/api';

type parsedProduct = {
  product: TypeProduct[];
};

const RightDetails = (parsed: parsedProduct) => {

  const [tallas, setTallas] = useState([] as Talla[]);
  const [talla, setTalla] = useState('');

  useEffect(() => {
    const loadTallas = async () => {
      setTallas(await getTallas(parsed.product[0].id));
    }
    loadTallas();
  }, [setTallas, parsed]);

  function addToCart() {
    const item = { "_objectId": parsed.product[0]._objectId, "id": parsed.product[0].id, "nombre": parsed.product[0].nombre, "precio": parsed.product[0].precio, "imagen": parsed.product[0].imagen, "talla": talla };
    var cart: string = sessionStorage.getItem('cart') as string;
    if (JSON.parse(cart).length > 0) {
      var newCart: string = cart.substring(0, cart.length - 1) + ',' + JSON.stringify(item) + ']';
    } else {
      var newCart: string = cart.substring(0, cart.length - 1) + JSON.stringify(item) + ']';
    }
    
    sessionStorage.setItem('cart', newCart);
    alert("Artículo: \"" + parsed.product[0].nombre + "\" añadido al carrito.");
  }

  return (
    <Box sx={{ '& button': { m: 2 } }} >
      <div>
        <Typography gutterBottom variant="h3" color="#FFFFFF">
          {parsed.product[0].nombre}
        </Typography>
        <Typography gutterBottom variant="h4" color="#FFFFFF">
          {parsed.product[0].descripcion}
        </Typography>
        <Typography gutterBottom variant="h6" color="#FFFFFF">
          {parsed.product[0].precio} €
        </Typography>
      </div>

      <div>
        <Typography color="#FFFFFF">
          Color
        </Typography>
        <Typography gutterBottom variant="h6" color="#FFFFFF">
          {parsed.product[0].color}
        </Typography>
      </div>

      <div>
        <Typography color="#FFFFFF">
          Tallas disponibles
        </Typography>
        <ButtonGroup color="primary" variant="outlined" aria-label="tallas">
          {tallas.map(t => (
            <Button sx={talla == t.numero ? ({ bgcolor: 'black', color: '#FFFFFF' }) : ({ color: 'black', bgcolor: '#FFFFFF' })} onClick={() => setTalla(t.numero)}>{t.numero}</Button>
          ))}
        </ButtonGroup>
      </div>

      <div>
        <Button variant="contained" endIcon={<ShoppingCartIcon />} sx={{ bgcolor: 'black' }} onClick={addToCart}>
          Añadir al carrito
        </Button>
      </div>

      <div>
        <TableSizes />
      </div>
    </Box>
  );
};
export default RightDetails;