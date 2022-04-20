import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const useStyles = makeStyles({
    sizes: {
      marginLeft:'34%',
      marginTop:'100px', 
    },  
  });
  
  function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
  export default function CustomImageList() {
    const classes = useStyles();
    return (
      <ImageList
        sx={{
          width: '30%',
          height: '10%',
          // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        gap={1}
        className={classes.sizes}
      >
        {itemData.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;
  
          return (
            <ImageListItem key={item.img} cols={cols} rows={rows}>
              <img
                {...srcset(item.img, 250, 200, rows, cols)}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${item.title}`}
                  >
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  }
  
const itemData = [
  {
    img: 'https://i.blogs.es/67332d/screenshot_4501/original.jpeg',
    title: 'Pokemon',
    featured: true,
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTviEWtiJBnAfMBudW5kmrIpt9tng4cD2_F_w1HDAnVAcnqoP5LJM9vKNBOBlrvSigJEIM&usqp=CAU',
    title: 'Zapatillas Baby Yoda',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.ecestaticos.com/Xt-KJxmVpvzrqtKT8eEnRNxbcTc=/51x0:1249x899/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F9c2%2F2d6%2F83d%2F9c22d683d9536e8961c5d4fe8a2f6f4f.jpg',
    title: 'Style',
    author: '@helloimnik',
  },
  {
    img: 'https://images-eu.ssl-images-amazon.com/images/G/30/AMAZON-FASHION/2021/FASHION/FEATURE_PAGES/SNEAKERS/MENS/04_C12x.jpg',
    title: 'Caña Alta',
    author: '@nolanissac',
  },
  {
    img: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/B9FF/production/_117751674_satan-shoes1.jpg',
    title: 'Lo último',
    author: '@hjrc33',
  },
  {
    img: 'https://www.clara.es/medio/2019/02/28/zapatillas-negras-vans-85%E2%82%AC_482707a2_1000x1500.jpg',
    title: 'Casual',
    author: '@arwinneil',
    featured: true,
  },
];
  