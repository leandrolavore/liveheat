import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Lanes from "../lanes";
import { TStudent } from "@/lib/students";
import '@testing-library/jest-dom';

describe("Lanes Component", () => {
  test("renders lane numbers correctly", () => {
    const lanes = new Map<number, TStudent>([
      [1, { name: "Alice Johnson", id: 101 }],
      [2, { name: "Bob Smith", id: 102 }],
      [3, { name: "Charlie Brown", id: 103 }],
    ]);

    render(<Lanes lanes={lanes} removeStudent={jest.fn()} />);

    expect(screen.getByText("Lane 1")).toBeInTheDocument();
    expect(screen.getByText("Lane 2")).toBeInTheDocument();
    expect(screen.getByText("Lane 3")).toBeInTheDocument();
  });

  test("displays student names in lanes", () => {
    const lanes = new Map<number, TStudent>([
      [1, { name: "Alice Johnson", id: 101 }],
      [2, { name: "Bob Smith", id: 102 }],
    ]);

    render(<Lanes lanes={lanes} removeStudent={jest.fn()} />);

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  test("shows empty lanes message when no student is assigned", () => {
    const lanes = new Map<number, TStudent>();

    render(<Lanes lanes={lanes} removeStudent={jest.fn()} />);

    expect(screen.getAllByText("Empty").length).toBe(10);
  });

  test("triggers removeStudent when clicking remove button", async () => {
    const mockRemoveStudent = jest.fn();
    const lanes = new Map<number, TStudent>([
      [1, { name: "Alice Johnson", id: 101 }],
    ]);

    render(<Lanes lanes={lanes} removeStudent={mockRemoveStudent} />);

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    await userEvent.click(removeButtons[0]);

    expect(mockRemoveStudent).toHaveBeenCalledTimes(1);
    expect(mockRemoveStudent).toHaveBeenCalledWith({ name: "Alice Johnson", id: 101 });
  });
});