import Nav from '../Fragments/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../Fragments/Footer';
import { Divider, Stack } from '@mui/material';
import ShoesCart from './ShoesCart';
import CartButons from './CartButons';

const Cart = () => {
    return (
      <div>
        <Nav/>
        <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        >
            <ShoesCart/>
            <CartButons/>
        </Stack>
        <Footer/>
      </div>   
    );
  };
  export default Cart;
