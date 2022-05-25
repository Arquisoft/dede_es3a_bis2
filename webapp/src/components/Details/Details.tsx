import React from 'react';
import Nav from '../Fragments/Nav';
import Footer from '../Fragments/Footer';
import { Divider, Stack } from '@mui/material';
import LeftDetails from './LeftDetails';
import RightDetails from './RightDetails';
import { useState, useEffect } from 'react';
import { TypeProduct } from '../../shared/shareddtypes';
import { getProduct } from '../../api/api';

export default function Details(): JSX.Element {
  //Obtenemos la parte de parametros de la url
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring)

  //Obtenemos la id del producto
  const id = params.get('id') as string;

  const [product, setProduct] = useState<TypeProduct>();
  const reloadDetails = async () => {
    var prod = await getProduct(id);
    if (prod != undefined) {
      setProduct(prod);
    }
  }
  useEffect(() => {
    // De esta forma evitamos que la pagina se este recargando permanentemente
    reloadDetails();
  }, []);

  if (typeof product === "undefined") {
    return (
      <div>
        <Nav />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Nav />
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <LeftDetails productId={id} />
          <RightDetails product={product as unknown as Array<TypeProduct>} />
        </Stack>
        <Footer />
      </div>
    );
  }
}