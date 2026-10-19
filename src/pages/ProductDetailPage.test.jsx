import {render, screen, fireEvent} from '@testing-library/react';
import ProductDetailPage from "./ProductDetailPage.jsx";
import { it, expect, describe, vi, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "../context/CartContext.jsx";

afterEach(() => {
    vi.restoreAllMocks();
});

function CartStateDisplay() {
    const [state] = useCart();

    return (
        <p>
            Cart quantity:{" "}
            {state.items.reduce((total, item) => total + item.quantity, 0)}
        </p>
    );
}
describe("ProductDetailPage", () => {
    it("shows a loading message while the product is being fetched", () => {

        vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise(() => {}));
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
                    <MemoryRouter initialEntries={["/products/1"]}>
                        <Routes>
                            <Route
                                path="/products/:id"
                                element={<ProductDetailPage />}
                            />
                        </Routes>
                    </MemoryRouter>
                </CartProvider>
            </QueryClientProvider>
        );
        const loadingMessage = screen.getByText("Loading product…");
        expect(loadingMessage).toBeInTheDocument();
    });

    it("displays product details when the product is fetched successfully", async () => {
        const product = {
            id: "1",
            title: "Tea Cup",
            description: "A beautiful ceramic tea cup",
            price: 5,
            category: "Home",
            image: "tea-cup.jpg"
        }
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => product,
        });

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                }
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <MemoryRouter initialEntries={["/products/1"]}>
                        <Routes>
                            <Route
                            path="/products/:id"
                            element={<ProductDetailPage />}/>
                        </Routes>
                    </MemoryRouter>

                    <CartStateDisplay />
                </CartProvider>
            </QueryClientProvider>
        )

        const productTitle = await screen.findByText("Tea Cup");
        expect(productTitle).toBeInTheDocument();

        const productDescription = await screen.findByText(
            "A beautiful ceramic tea cup"
        );
        expect(productDescription).toBeInTheDocument();

        const productPrice = await screen.findByText("$5.00");
        expect(productPrice).toBeInTheDocument();

        const addToCartButton = screen.getByRole("button", {
            name: "Add to Cart",
        });
        expect(addToCartButton).toBeInTheDocument();
        fireEvent.click(addToCartButton);

        const cartQuantity = screen.getByText("Cart quantity: 1");
        expect(cartQuantity).toBeInTheDocument();

        fireEvent.click(addToCartButton);

        const updatedCartQuantity = screen.getByText("Cart quantity: 2");
        expect(updatedCartQuantity).toBeInTheDocument();
    });

    it("displays an error message when fetching the product fails", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: false,
            json: async () => ({}),
        });
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
                    <MemoryRouter initialEntries={["/products/1"]}>
                        <Routes>
                            <Route
                                path="/products/:id"
                                element={<ProductDetailPage />}
                            />
                        </Routes>
                    </MemoryRouter>
                </CartProvider>
            </QueryClientProvider>
        );
        const errorMessage = await screen.findByText(
            "Error: Failed to fetch product"
        );
        expect(errorMessage).toBeInTheDocument();
    });
});
