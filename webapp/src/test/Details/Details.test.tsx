import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Details from "../../components/Details/Details"

test('Details working properly', async()=>{
    render(<BrowserRouter><Details></Details></BrowserRouter>)
})