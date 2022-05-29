import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import SeleccionaCentroDistribucion from "../../components/Cart/SeleccionaCentroDistribucion"

test('SeleccionaCentroDistribucion working properly', async () => {
    const {getByText} = render(<BrowserRouter><SeleccionaCentroDistribucion></SeleccionaCentroDistribucion></BrowserRouter>);
    expect(getByText("DISTRIBUIDORES DISPONIBLES")).toBeInTheDocument();
})