import { screen, render } from "@testing-library/react"
import List from "../../components/Home/List";

test('home List wokring', async () => {
    render(<List />);

    const pokemon = screen.getByAltText("Pokemon");
    expect(pokemon).toBeInTheDocument();
    const babyYoda = screen.getByAltText("Zapatillas Baby Yooda");
    expect(babyYoda).toBeInTheDocument();
    const style = screen.getByAltText("Style");
    expect(style).toBeInTheDocument();
    const cañaAlta = screen.getByAltText("Caña Alta");
    expect(cañaAlta).toBeInTheDocument();
    const loUltimo = screen.getByAltText("Lo último");
    expect(loUltimo).toBeInTheDocument();
    const casual = screen.getByAltText("Casual");
    expect(casual).toBeInTheDocument();
})