import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();
  const main = screen.getByTestId("main");
  expect(main).toBeInTheDocument();
  const footer = screen.getByTestId("footer");
  expect(footer).toBeInTheDocument();
});
