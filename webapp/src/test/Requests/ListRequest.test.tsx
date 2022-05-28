import { render } from "@testing-library/react";
import ListRequests from '../../components/Requests/ListRequests';

test('empty ListRequest working', async () => {
    const { getByText } = render(<ListRequests />);

    const text = "No has realizado ningún pedido."
    expect(getByText(text)).toBeInTheDocument();
});