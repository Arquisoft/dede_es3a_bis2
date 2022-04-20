import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {alpha, Grid, InputBase, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { TypeProduct } from '../../shared/shareddtypes';
import SearchIcon from '@mui/icons-material/Search';
import { FilterAltRounded } from '@mui/icons-material';
import { getProducts } from '../../api/api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const useStyles = makeStyles({
  sizes: {
    marginLeft:'35%',
    marginRight:'20%',
    marginTop:'20%',
    width: '70%',
    height: '82%',
    "&:hover ": { transform: "scale3d(1.05, 1.05, 1)",
      boxShadow: "-1px 1px 20px 0px rgba(0,0,0,0.9)",
  }
} 
});

type ProductsParsed = {
  products: TypeProduct[]
}

const ShoesView = (parsed : ProductsParsed) => {
  const classes = useStyles();
  const [productos, setProductos]=useState<TypeProduct[]>([]);
  //Primera vez coge los productos de la BD
  const refreshProductos = async () => {
    setProductos(await getProducts());
  }
  useEffect(()=>{
  refreshProductos();
  },[]);
  function filterFunction(texto: any) {
    var filter;
    if(texto==""){
      filter=parsed.products;
    }
    else{
      filter=parsed.products.filter((p)=>p.nombre.startsWith(texto)); 
    }
    setProductos(filter);
   }
  let details = '/Details?id='
  return (
    <><Search color='white'>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        onChange={(event: any) => {
          filterFunction(event.target.value);
        }}
        inputProps={{ 'aria-label': 'search' }} 
        
        
        />
    </Search><Grid container spacing={1} columns={{ xs: 4, sm: 6, md: 7 }}>
        {productos.map(item => <Grid item xs={4} sm={2} md={2} key={item.id}>
          <Card className={classes.sizes}>
            <CardActionArea
              to={details + item.id}
              component={Link}>
              <CardMedia
                component="img"
                alt={item.nombre}
                height='80%'
                width="50%"
                image={item.imagen}
                title={item.nombre} />
              <CardContent>
                <Typography variant='h6'>
                  {item.nombre}
                </Typography>
                <Typography variant='h6'>
                  Precio:{item.precio}
                </Typography>

              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        )}
      </Grid></>
  );
}

export default ShoesView;






























