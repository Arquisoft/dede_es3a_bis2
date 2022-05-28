import { Home } from "@mui/icons-material";
import { screen, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import List from "../../components/Home/List"

test('home working', async () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
})