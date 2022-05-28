import { render } from "@testing-library/react";
import { ObjectId } from "bson";
import RightDetails from "../../components/Details/RightDetails";
import { TypeProduct } from "../../shared/shareddtypes";

test('RightDetails working properly', async () => {
    // objectId de las Vans
    const objectId: ObjectId = new ObjectId("628b78f7e9e8b4f7aa3bf34e");
    const producto: TypeProduct[] = [{
        _objectId: objectId,
        id: "1",
        nombre: "Vans Checkerboard Old Skool Stacked",
        precio: 100,
        descripcion: "Zapatillas Vans Checkerboard Old Skool Stacked",
        color: "Blanco"
    }];

    const { getByText, getByTitle } = render(<RightDetails product={producto}></RightDetails>);

    expect(getByText(producto[0].nombre)).toBeInTheDocument();
    expect(getByText(producto[0].precio + " €")).toBeInTheDocument();
    expect(getByText(producto[0].descripcion)).toBeInTheDocument();
    expect(getByText("Color")).toBeInTheDocument();
    expect(getByText("Blanco")).toBeInTheDocument();
    expect(getByText("Tallas disponibles")).toBeInTheDocument();
    expect(getByText("Añadir al carrito")).toBeInTheDocument();
    // expect(getByTitle("38")).toBeInTheDocument();
    // expect(getByTitle("39")).toBeInTheDocument();
    // expect(getByTitle("40")).toBeInTheDocument();
    // expect(getByTitle("41")).toBeInTheDocument();
})