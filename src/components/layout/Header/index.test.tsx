import { render, screen } from "@testing-library/react";
import React from "react";
import Header from ".";

test("render header component", () => {
  render(<Header />);

  const imgElement = screen.getByRole("img");

  expect(imgElement).toBeVisible();
});
