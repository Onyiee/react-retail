
import { it, expect, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./Login.jsx";
import { MemoryRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";

function LocationDisplay() {
    const location = useLocation();
    return <p>{location.pathname}</p>;
}

afterEach(() => {
    cleanup();
});

describe("LoginPage", () => {
    it("renders the email, password fields and login button", () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </MemoryRouter>
        );

        const email = screen.getByLabelText("Email");
        const password = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", {
            name: "Log in",
        });

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it("logs in and navigates to checkout", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <AuthProvider>
                    <LoginPage />
                    <LocationDisplay />
                </AuthProvider>
            </MemoryRouter>
        );

        const email = screen.getByLabelText("Email");
        const password = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", {
            name: "Log in",
        });

        await user.type(email, "example@email.com");
        await user.type(password, "Password123!");
        await user.click(loginButton);

        expect(screen.getByText("/checkout")).toBeInTheDocument();
    });
});
