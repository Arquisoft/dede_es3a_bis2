import { screen, render } from "@testing-library/react";
import { ObjectId } from "bson"
import exp from "constants";
import LeftDetails from "../../components/Details/LeftDetails";
import { TypeProduct } from "../../shared/shareddtypes";

test('LeftDetails working properly', async () => {
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

    render(<LeftDetails producto={producto}></LeftDetails>);

    const imagen = screen.getByAltText("principal");
    expect(imagen).toBeInTheDocument();
})