
import CheckoutPage from "./CheckoutPage.jsx";
import { it, expect, describe, vi, afterEach } from "vitest";
import {
    render,
    screen,
    fireEvent,
    waitFor,
    cleanup,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider, useCart } from "../context/CartContext.jsx";
import { useEffect } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

function SeedCart({ children }) {
    const [, dispatch] = useCart();

    useEffect(() => {
        dispatch({
            type: "ADD_ITEM",
            payload: {
                id: "1",
                title: "Tea Cup",
                price: 5,
            },
        });
    }, [dispatch]);

    return children;
}

function renderCheckout() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <MemoryRouter>
                    <SeedCart>
                        <CheckoutPage />
                    </SeedCart>
                </MemoryRouter>
            </CartProvider>
        </QueryClientProvider>
    );
}

describe("CheckoutPage", () => {
    it("renders the checkout form", async () => {
        renderCheckout();

        expect(
            screen.getByRole("heading", { name: "Checkout" })
        ).toBeInTheDocument();

        expect(
            await screen.findByRole("textbox", { name: /name/i })
        ).toBeInTheDocument();
    });

    it("places an order and displays a success message", async () => {
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

        renderCheckout();

        fireEvent.change(
            await screen.findByRole("textbox", { name: /name/i }),
            { target: { value: "Jane Doe" } }
        );

        fireEvent.change(
            screen.getByRole("textbox", { name: /email/i }),
            { target: { value: "jane@example.com" } }
        );

        fireEvent.change(
            screen.getByRole("textbox", { name: /address/i }),
            { target: { value: "Lagos, Nigeria" } }
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Place Order" })
        );

        expect(
            await screen.findByText("Order placed successfully!")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Order number: #123")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Order total: $5.00")
        ).toBeInTheDocument();
    });

    it("displays an error message when order submission fails", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: false,
            json: async () => ({}),
        });

        renderCheckout();

        fireEvent.change(
            await screen.findByRole("textbox", { name: /name/i }),
            { target: { value: "Jane Doe" } }
        );

        fireEvent.change(
            screen.getByRole("textbox", { name: /email/i }),
            { target: { value: "jane@example.com" } }
        );

        fireEvent.change(
            screen.getByRole("textbox", { name: /address/i }),
            { target: { value: "Lagos, Nigeria" } }
        );

        fireEvent.click(
            screen.getByRole("button", { name: "Place Order" })
        );

        expect(
            await screen.findByRole("alert")
        ).toHaveTextContent("Failed to create order");
    });
});
