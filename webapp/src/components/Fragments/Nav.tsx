import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSession } from '@inrupt/solid-ui-react';

const useStyle = makeStyles({
  stickToBottom: {
    background: "linear-gradient(45deg, #000000 30%, #FFFFFF 70%)",
    borderBottomLeftRadius:'15px',
    borderBottomRightRadius:'15px',
  },
  colorButtom: {
    color:'black',
  },
});


export default function MenuAppBar() {
  const classes = useStyle();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {session, logout} = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.stickToBottom}>
        <Toolbar className={classes.stickToBottom}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          </Typography>
          {auth && (
            <div>
              <IconButton 
                to='/'
                component={Link}
                size="large"
                className={classes.colorButtom}
              >
                <HomeIcon/>
              </IconButton>
              <IconButton
                to='/Cart'
                component={Link}
                size="large"
                className={classes.colorButtom}
              >
                <ShoppingCartIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className={classes.colorButtom}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

              <MenuItem onClick={handleClose} to='/Requests'
                component={Link} >Mis pedidos</MenuItem>
              {!session.info.isLoggedIn ? (
                  <MenuItem onClick={handleClose} to='/FormLogIn'
                  component={Link} >Login</MenuItem>
              ): ([
                <MenuItem onClick={handleClose} to='/ProfileViewer'
                component={Link} >Profile</MenuItem> ,
                <MenuItem onClick={handleClose} to='/FormLogIn'
                component={Link} >LogOut</MenuItem>
              ]
              )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
