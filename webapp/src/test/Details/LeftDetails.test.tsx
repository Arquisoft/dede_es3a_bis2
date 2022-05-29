import { screen, render } from "@testing-library/react";
import { ObjectId } from "bson"
import { BrowserRouter } from "react-router-dom";
import LeftDetails from "../../components/Details/LeftDetails";

test('LeftDetails working properly', async () => {
    render(<LeftDetails></LeftDetails>);
})