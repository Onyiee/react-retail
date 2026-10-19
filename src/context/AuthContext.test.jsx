import { it, expect, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

function AuthStatus() {
    const { isAuthenticated } = useAuth();

    return (
        <p>
            {isAuthenticated ? "Logged in" : "Logged out"}
        </p>
    );
}

afterEach(() => {
    cleanup();
    localStorage.clear();
});

it("restores authentication from localStorage", () => {
    localStorage.setItem("isAuthenticated", "true");

    render(
        <AuthProvider>
            <AuthStatus />
        </AuthProvider>
    );

    expect(screen.getByText("Logged in")).toBeInTheDocument();
});


it("clears authentication from localStorage on logout", async () => {
    const user = userEvent.setup();
    localStorage.setItem("isAuthenticated", "true");

    function LogoutButton() {
        const { isAuthenticated, logout } = useAuth();

        return (
            <>
                <p>{isAuthenticated ? "Logged in" : "Logged out"}</p>
                <button onClick={logout}>Log out</button>
            </>
        );
    }

    render(
        <AuthProvider>
            <LogoutButton />
        </AuthProvider>
    );

    await user.click(screen.getByRole("button", { name: "Log out" }));
    expect(screen.getByText("Logged out")).toBeInTheDocument();
    expect(localStorage.getItem("isAuthenticated")).toBeNull();
});
