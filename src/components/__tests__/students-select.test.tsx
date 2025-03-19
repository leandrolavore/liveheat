import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StudentsSelect from "../students-select";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

jest.mock("nanoid", () => ({
  nanoid: () => "12345678",
}));

describe("StudentsSelect Component", () => {
  test("validates input fields correctly", async () => {
    render(<StudentsSelect addStudent={jest.fn()} />);

    await fireEvent.click(screen.getByText("Add student"));

    await waitFor(() => {
      expect(screen.getAllByText("Must be 2 or more characters long")).toHaveLength(2);
    });

    await userEvent.type(screen.getByPlaceholderText("enter name"), "A");
    fireEvent.blur(screen.getByPlaceholderText("enter name"));

    await waitFor(() => {
      const errorMessages = screen.getAllByText("Must be 2 or more characters long");
      expect(errorMessages.length).toBe(2);
      expect(errorMessages[0]).toBeInTheDocument();
      expect(errorMessages[1]).toBeInTheDocument();
    });
  });

  test("clears form after successful submission", async () => {
    render(<StudentsSelect addStudent={jest.fn()} />);

    const firstNameInput = screen.getByPlaceholderText("enter name");
    const lastNameInput = screen.getByPlaceholderText("enter last name");

    await userEvent.type(firstNameInput, "Charlie");
    await userEvent.type(lastNameInput, "Brown");
    fireEvent.click(screen.getByText("Add student"));

    await waitFor(() => {
      expect(firstNameInput).toHaveValue("");
      expect(lastNameInput).toHaveValue("");
    });
  });
});