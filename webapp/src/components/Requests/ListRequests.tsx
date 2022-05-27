import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { TypePedido } from '../../shared/shareddtypes';
import { getPedidos } from '../../api/api';
import { useSession } from '@inrupt/solid-ui-react';

const ListRequests = () => {
  const [pedidos, setPedidos] = React.useState<TypePedido[]>([]);
  const { session } = useSession();
  const webId = session.info.webId!!;

  const reloadPedidos = async () => {
    setPedidos(await getPedidos(webId));
  }

  React.useEffect(() => {
    reloadPedidos();
  }, [])

  return (
    <div>
      <List sx={{
        marginLeft: '35%',
        marginRight: '50%',
        marginTop: '10%',
        width: '200%',
        maxWidth: 500,
        bgcolor: 'background.paper'
      }}>
        {
          Object.keys(pedidos).length !== 0 ? (
            pedidos.map(producto =>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar> <FormatListBulletedIcon /> </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={producto.usuario}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Precio: {producto.precio}
                      </Typography>
                      <Typography>
                        {producto.contenido.map(p => p + ' || ')}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
          ) : ([
            <ListItem alignItems='flex-start'>
              <ListItemText secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component='span'
                    variant='body2'
                    color='text.primary'>
                    No has realizado ningún pedido.
                  </Typography>
                </React.Fragment>
              } />
            </ListItem>
          ])
        }
      </List>
    </div>
  );
}
export default ListRequests;