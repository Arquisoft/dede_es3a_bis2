import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Cart from "../../components/Cart/Cart"

test('Cart working properly', async () => {
    render(<BrowserRouter><Cart></Cart></BrowserRouter>);
})