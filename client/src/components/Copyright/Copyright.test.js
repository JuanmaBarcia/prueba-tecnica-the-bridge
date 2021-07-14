import { render, screen } from "@testing-library/react";
import Copyright from "./Copyright";

test("show the correct year in the footer", () => {
  render(<Copyright />);
  const regex = new RegExp(new Date().getFullYear());
  const year = screen.getByText(regex);
  expect(year).toBeInTheDocument();
});
