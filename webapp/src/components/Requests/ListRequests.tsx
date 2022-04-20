import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const info = [
  {
    name: "pedido1",
    precioFinal: String(50),
  },
  {
    name: "pedido2",
    precioFinal: String(60),
  },
  {
    name: "pedido3",
    precioFinal: String(70),
  },
]

const ListRequests = () => {
  return (
    <List sx={{  marginLeft:'35%',
                marginRight:'50%',
                marginTop: '10%',
                width: '200%', 
                maxWidth: 500, 
                bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar> <FormatListBulletedIcon /> </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary= {info[0].name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Precio del pedido: {info[0].precioFinal}
              </Typography>
              <Typography>
                - Playero 1
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar> <FormatListBulletedIcon /> </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={info[1].name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Precio del pedido: {info[1].precioFinal}
              </Typography>
              <Typography>
                - Playero 1
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
         <Avatar> <FormatListBulletedIcon /> </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={info[2].name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Precio del pedido: {info[2].precioFinal}
              </Typography>
              <Typography>
                - Playero 1
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
export default ListRequests;