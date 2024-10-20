import { render, screen, fireEvent } from "@testing-library/react";
import ClientTodo from "../components/todo/client-component";
import { createClient } from "@/utils/supabase/client";

jest.mock("@/utils/supabase/client");

describe("ClientTodo Component", () => {
  let mockInsert: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockDelete: jest.Mock;

  beforeEach(() => {
    mockInsert = jest
      .fn()
      .mockResolvedValue({ data: [{ id: 2, task: "New Task" }] });
    mockUpdate = jest
      .fn()
      .mockResolvedValue({ data: [{ id: 1, task: "Updated Task" }] });
    mockDelete = jest.fn().mockResolvedValue({ data: [{ id: 1 }] });

    (createClient as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest
        .fn()
        .mockResolvedValue({ data: [{ id: 1, task: "Test Task" }] }),
      insert: mockInsert,
      update: mockUpdate,
      delete: mockDelete,
    });
  });

  it("adds TODO", async () => {
    render(<ClientTodo />);
    fireEvent.change(screen.getByPlaceholderText("New TODO"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText("Add"));

    expect(mockInsert).toHaveBeenCalledWith([
      { title: "new title", priority: 1 },
    ]);
  });

  it("updates TODO", async () => {
    render(<ClientTodo />);
    const todoInput = await screen.findByDisplayValue("Test Task");
    fireEvent.change(todoInput, { target: { value: "Updated Task" } });

    expect(mockUpdate).toHaveBeenCalledWith({ title: "Updated Task" }, 1);
  });

  it("delete TODO", async () => {
    render(<ClientTodo />);
    fireEvent.click(await screen.findByText("Delete"));

    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
