import { makeStyles } from '@material-ui/core/styles';
import { ImageList, ImageListItem } from "@mui/material";

const LeftDetails = () => {
      
      return (
        <ImageList variant="masonry" cols={3} gap={8}>
         {itemData.map((item) => (
             <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                />
            </ImageListItem>
            ))}
        </ImageList>
      );
    };
    export default LeftDetails;

const itemData = [
    {
        img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b5d26789-8695-4ea4-80e0-47e59b6a3d8e/air-force-1-zapatillas-46WdMJ.png',
        title: 'De lado 1',
    },
    {
        img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/31009f98-f51d-4f46-a563-cda56442fddf/air-force-1-zapatillas-46WdMJ.png',
        title: 'Diagonal de frente',
    },
    {
        img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f7357828-48e0-4462-b272-3e0fbc464294/air-force-1-zapatillas-46WdMJ.png',
        title: 'De lado 2',
    },
    {
        img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/245de3a2-4751-4d64-991d-0283e5559605/air-force-1-zapatillas-46WdMJ.png',
        title: 'De arriba',
    },
    {
        img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c9a4398b-9e2d-4fac-afaa-54e455e27b30/air-force-1-zapatillas-46WdMJ.png',
        title: 'De atras',
    },
    {
        img: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/28194612-6e3f-45b3-bb16-a7c80c99c40a/air-force-1-zapatillas-46WdMJ.png',
        title: 'Abajo',
    }
];
      