import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Register from "../Pages/Register";
import { registerUser } from "../Services/api";

jest.mock("../Services/api", () => ({
  registerUser: jest.fn(() => Promise.resolve({})),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Register component", () => {
  beforeEach(() => {
    useNavigate.mockClear();
    useDispatch.mockClear();
    useSelector.mockClear();
    registerUser.mockClear();
  });

  test("renders register form correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check if the register form elements are rendered correctly
    expect(screen.getByLabelText(/picture url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/firstname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lastname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("handles input correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simulate user input in the form fields
    const pictureUrlInput = screen.getByLabelText(/picture url/i);
    const firstnameInput = screen.getByLabelText(/firstname/i);
    const lastnameInput = screen.getByLabelText(/lastname/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(pictureUrlInput, {
      target: { value: "https://example.com/avatar.jpg" },
    });
    fireEvent.change(firstnameInput, { target: { value: "John" } });
    fireEvent.change(lastnameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if the input values are set correctly
    expect(pictureUrlInput.value).toBe("https://example.com/avatar.jpg");
    expect(firstnameInput.value).toBe("John");
    expect(lastnameInput.value).toBe("Doe");
    expect(emailInput.value).toBe("johndoe@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("submits form correctly", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simulate user input in the form fields
    const firstnameInput = screen.getByLabelText(/firstname/i);
    const lastnameInput = screen.getByLabelText(/lastname/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(firstnameInput, { target: { value: "John" } });
    fireEvent.change(lastnameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));

    expect(registerUser).toHaveBeenCalledWith({
      first_name: "John",
      last_name: "Doe",
      email: "test@example.com",
      password: "password123",
      pictureUrl: "",
    });
  });
});
