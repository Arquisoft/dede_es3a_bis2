import { render } from "@testing-library/react";
import Footer from "../../components/Fragments/Footer"

test('check footer renders right', async () => {
    const { getByText } = render(<Footer />);
    expect(getByText("@dede_es3a_bis2")).toBeInTheDocument();
})