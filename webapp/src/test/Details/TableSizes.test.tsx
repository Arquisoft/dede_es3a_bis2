import { render } from "@testing-library/react";
import TableSizes from "../../components/Details/TableSizes"

test('TableSizes working properly', async () => {
    const { getByText } = render(<TableSizes></TableSizes>);

    expect(getByText("Medida del pie")).toBeInTheDocument();
    expect(getByText("US - Hombre")).toBeInTheDocument();
    expect(getByText("US - Mujer")).toBeInTheDocument();
    expect(getByText("UK")).toBeInTheDocument();
    expect(getByText("CM")).toBeInTheDocument();
    expect(getByText("EU")).toBeInTheDocument();
})