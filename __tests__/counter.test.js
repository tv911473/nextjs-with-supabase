import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./components/counter";

test("renders the counter with initial value 0", () => {
  render(<Counter />);
  const counter = screen.getByText(/Count: 0/i);
  expect(counter).toBeInTheDocument();
});

test("increases the counter by 1", () => {
  render(<Counter />);
  const increaseButton = screen.getByText("Increase");
  fireEvent.click(increaseButton);
  const counter = screen.getByText(/Count: 1/i);
  expect(counter).toBeInTheDocument();
});

test("decreases the counter by 1", () => {
  render(<Counter />);
  const decreaseButton = screen.getByText("Decrease");
  fireEvent.click(decreaseButton);
  const counter = screen.getByText(/Count: -1/i);
  expect(counter).toBeInTheDocument();
});
