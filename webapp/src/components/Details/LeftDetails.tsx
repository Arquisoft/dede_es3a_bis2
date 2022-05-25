import { makeStyles } from '@material-ui/core/styles';
import { ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from 'react';
import { getFotos } from '../../api/api';
import { Foto } from '../../shared/shareddtypes';

const LeftDetails = (props: any) => {

    const productId = props.productId;

    const [fotos, setFotos] = useState([] as Foto[]);

    useEffect(() => {
        const recuperarFotos = async () => {
            setFotos(await getFotos(productId));
        }
        recuperarFotos();
    }, [setFotos]);

    return (
        <ImageList variant="masonry" cols={3} gap={8}>
            {fotos.map((item) => (
                <ImageListItem key={item.ruta}>
                    <img
                        src={`${item.ruta}`}
                        alt={item.descripcion}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
export default LeftDetails;

