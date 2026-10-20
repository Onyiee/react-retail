import CartPage from "./CartPage.jsx";
import { it, expect, describe, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {CartProvider, CartReducer, useCart} from "../context/CartContext.jsx";
import {createContext, useEffect, useReducer} from "react";

afterEach(() => {
    cleanup();
});

function AddProductToCart({ product }) {
    const [, dispatch] = useCart();

    useEffect(() => {
        dispatch({
            type: "ADD_ITEM",
            payload: product,
        });
    }, [dispatch, product]);

    return null;
}

describe("CartPage", () => {
    it("displays an empty-cart message when the cart has no items", () => {

        render(
            <CartProvider>
                <MemoryRouter>
                    <CartPage />
                </MemoryRouter>
            </CartProvider>
        );
        const emptyCartMessage = screen.getByText("Your cart is empty.");
        expect(emptyCartMessage).toBeInTheDocument();

        const continueShoppingLink = screen.getByRole("link", {
            name: "Continue Shopping",
        });
        expect(continueShoppingLink).toHaveAttribute("href", "/");
    });

    it("displays cart items and the total price", () => {

        const product = {
            id: "1",
            title: "Tea Cup",
            price: 5,
        };
        render(
            <CartProvider>
                <MemoryRouter>
                    <AddProductToCart product={product} />
                    <CartPage />
                </MemoryRouter>
            </CartProvider>
        );
        const productTitle = screen.getByText("Tea Cup");
        expect(productTitle).toBeInTheDocument();
        const unitPrice = screen.getByText("Unit price: $5.00");
        expect(unitPrice).toBeInTheDocument();
        const cartTotalLabel = screen.getByText("Total");
        expect(cartTotalLabel.parentElement).toHaveTextContent("$5.00");
    });

    it("increases the item quantity when the plus button is clicked", () => {
        const product = {
            id: "1",
            title: "Tea Cup",
            price: 5,
        };

        render(
            <CartProvider>
                <MemoryRouter>
                    <AddProductToCart product={product} />
                    <CartPage />
                </MemoryRouter>
            </CartProvider>
        );

        const increaseButton = screen.getAllByRole("button", {
            name: "+",
        })[0];
        expect(increaseButton).toBeInTheDocument();
        fireEvent.click(increaseButton);

        const updatedQuantity = screen.getByText("2", {
            selector: "p",
        });
        expect(updatedQuantity).toBeInTheDocument();


        const updatedCartTotals = screen.getAllByText("$10.00");
        expect(updatedCartTotals).toHaveLength(2);

    });

    it("removes an item from the cart when the Remove button is clicked", () => {
        const product = {
            id: "1",
            title: "Tea Cup",
            price: 5,
        };

        render(
            <CartProvider>
                <MemoryRouter>
                    <AddProductToCart product={product} />
                    <CartPage />
                </MemoryRouter>
            </CartProvider>
        );

        fireEvent.click(screen.getByRole("button", { name: "Remove" }));

        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });

    it("decreases the item quantity when the minus button is clicked", () => {
        const product = {
            id: "1",
            title: "Tea Cup",
            price: 5,
        };

        render(
            <CartProvider>
                <MemoryRouter>
                    <AddProductToCart product={product} />
                    <CartPage />
                </MemoryRouter>
            </CartProvider>
        );

        fireEvent.click(screen.getByRole("button", { name: "+" }));
        fireEvent.click(screen.getByRole("button", { name: "-" }));

        expect(screen.getByText("1", { selector: "p" })).toBeInTheDocument();
    });


});