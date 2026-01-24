import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SiteConfigProvider } from "../context/SiteConfigContext.jsx";
import Home from "../pages/Home.jsx";

const renderWithProviders = (ui) =>
  render(
    <BrowserRouter>
      <SiteConfigProvider>{ui}</SiteConfigProvider>
    </BrowserRouter>
  );

describe("Home", () => {
  it("renderiza título principal", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Caminho do Ser/i)).toBeInTheDocument();
  });
});
