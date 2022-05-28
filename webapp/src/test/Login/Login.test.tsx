import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Login from "../../components/Login/Login"

test('Login working properly', async () => {
    render(<BrowserRouter><Login></Login></BrowserRouter>)
})