import { render } from "@testing-library/react";
import ShoesCart from "../../components/Cart/ShoesCart"

test('ShoesCart working properly', async () => {
    const { getByText } = render(<ShoesCart></ShoesCart>);

    expect(getByText("PRODUCTOS EN EL CARRITO")).toBeInTheDocument();
})