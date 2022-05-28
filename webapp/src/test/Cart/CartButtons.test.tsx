import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"
import CartButons from "../../components/Cart/CartButons"

test('CartButtons working properly', async () => {
    const { getByText } = render(<BrowserRouter><CartButons></CartButons></BrowserRouter>);

    // no hay nada en el carrito, es el único texto que aparece
    expect(getByText("Tu carrito de compra está vacío.")).toBeInTheDocument();
})