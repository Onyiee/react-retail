import CheckoutPage from "./CheckoutPage.jsx";
import { it, expect, describe, vi, afterEach  } from "vitest";
import { render, screen, fireEvent, waitFor,cleanup } from "@testing-library/react";
import { CartProvider } from "../context/CartContext.jsx";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("CheckoutPage", () => {
    it("renders the checkout form", () => {

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <CheckoutPage />
                </CartProvider>
            </QueryClientProvider>
        );
        const checkoutHeading = screen.getByRole("heading", {
            name: "Checkout",
        });
        expect(checkoutHeading).toBeInTheDocument();

        const nameInput = screen.getByRole("textbox", {
            name: /name/i,
        });
        expect(nameInput).toBeInTheDocument();
    });

    it("places an order and displays a success message", async () => {
        const queryClient = new QueryClient();

        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ({
                id: "123",
                items: [
                    {
                        id: "1",
                        title: "Tea Cup",
                        price: 5,
                        quantity: 1,
                    },
                ],
                customer: {
                    name: "Jane Doe",
                    email: "jane@example.com",
                    address: "Lagos, Nigeria",
                },
            }),
        });

        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <CheckoutPage />
                </CartProvider>
            </QueryClientProvider>
        );

        const nameInput = screen.getAllByRole("textbox")[0];

        fireEvent.change(nameInput, { target: { value: "Jane Doe" },
        });

        const emailInput = screen.getAllByRole("textbox")[1];

        fireEvent.change(emailInput, {
            target: { value: "jane@example.com" },
        });

        const addressInput = screen.getAllByRole("textbox")[2];

        fireEvent.change(addressInput, {
            target: { value: "Lagos, Nigeria" },
        });

        fireEvent.click(screen.getAllByRole("button", { name: "Place Order" })[0]);

        await waitFor(() => {
            expect(
                screen.getByText("Order placed successfully!")
            ).toBeInTheDocument();
        });

        const orderNumber = screen.getByText("Order number: #123");
        expect(orderNumber).toBeInTheDocument();

    });

    it("displays an error message when order submission fails", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: false,
            json: async () => ({}),
        });

        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <CheckoutPage />
                </CartProvider>
            </QueryClientProvider>
        );
        fireEvent.change(screen.getAllByRole("textbox")[0], {
            target: { value: "Jane Doe" },
        });

        fireEvent.change(screen.getAllByRole("textbox")[1], {
            target: { value: "jane@example.com" },
        });

        fireEvent.change(screen.getAllByRole("textbox")[2], {
            target: { value: "Lagos, Nigeria" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

        await waitFor(() => {
            const errorMessage = screen.getByText("Failed to create order");
            expect(errorMessage).toBeInTheDocument();
        });

    });
});