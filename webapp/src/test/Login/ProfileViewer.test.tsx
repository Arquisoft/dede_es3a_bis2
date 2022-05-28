import { screen, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import ProfileViewer from "../../components/Login/ProfileViewer"

test('ProfileViewer working properly', async () => {
    render(<BrowserRouter><ProfileViewer></ProfileViewer></BrowserRouter>);

    const logout = screen.getByText('Logout');
    expect(logout).toBeInTheDocument();
})