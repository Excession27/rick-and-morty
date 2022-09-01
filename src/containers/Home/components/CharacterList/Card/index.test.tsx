import { render, screen } from "@testing-library/react";
import React from "react";
import Card from ".";

test("render card component", () => {
  render(<Card image={""} name={"Dummy name"} />);

  const nameParagraph = screen.getByText(/duMmy/i);
  expect(nameParagraph).toBeInTheDocument();
  expect(nameParagraph).toBeVisible();
});

test("render card visible", () => {
  render(<Card image={""} name={"Dummy name"} />);

  const nameParagraph = screen.getByText(/duMmy/i);
  expect(nameParagraph).toBeVisible();
});
