import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Home", () => {
  it("renderiza título principal", () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Caminho do Ser/i)).toBeInTheDocument();
  });
});
