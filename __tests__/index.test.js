import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home Page", () => {
  it("renders the home page", () => {
    render(<Home />);
    expect(screen.getByText("Welcome to Next.js!")).toBeInTheDocument();
  });
});
