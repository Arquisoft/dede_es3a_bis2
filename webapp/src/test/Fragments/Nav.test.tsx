import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Nav from "../../components/Fragments/Nav";
import { screen } from "@testing-library/react";

test('check nav renders right', async () => {
    render(<BrowserRouter> <Nav></Nav></BrowserRouter>);

    const home = screen.getByTitle("Home");
    expect(home).toBeInTheDocument();
    const cart = screen.getByTitle("Cart");
    expect(cart).toBeInTheDocument();
    const misPedidos = screen.getByTitle("Mis pedidos");
    expect(misPedidos).toBeInTheDocument();
    const login = screen.getByTitle("Login");
    expect(login).toBeInTheDocument();
})