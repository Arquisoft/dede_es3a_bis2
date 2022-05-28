import { render } from "@testing-library/react";
import FormLogIn from "../../components/Login/FormLogIn"

test('FormLogin working properly', async () => {
    const { getByText } = render(<FormLogIn></FormLogIn>);

    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("¿No tienes una cuenta? Regístrate aqui")).toBeInTheDocument();
})