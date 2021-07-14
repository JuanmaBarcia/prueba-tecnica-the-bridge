import { render, screen } from "@testing-library/react";
import Details from "./Details";

test("render Details elements", () => {
  render(<Details />);
  const img = screen.getByTestId("imagen");
  expect(img).toBeInTheDocument();
  const title = screen.getByTestId("title");
  expect(title).toBeInTheDocument();
  const rating = screen.getByTestId("rating");
  expect(rating).toBeInTheDocument();
  const price = screen.getByTestId("price");
  expect(price).toBeInTheDocument();
  const manufacturer = screen.getByTestId("manufacturer");
  expect(manufacturer).toBeInTheDocument();
  const cif = screen.getByTestId("cif");
  expect(cif).toBeInTheDocument();
  const address = screen.getByTestId("address");
  expect(address).toBeInTheDocument();
});
