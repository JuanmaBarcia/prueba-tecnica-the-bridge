import { render, screen } from "@testing-library/react";
import Products from "./Products";

test("render the elements of the header of the products table", () => {
  render(<Products />);
  const th = screen.getByTestId("th");
  expect(th).toBeInTheDocument();
  const Nombre = screen.getByTestId("Nombre");
  expect(Nombre).toBeInTheDocument();
  const Relevancia = screen.getByTestId("Relevancia");
  expect(Relevancia).toBeInTheDocument();
  const Precio = screen.getByTestId("Precio");
  expect(Precio).toBeInTheDocument();
});
