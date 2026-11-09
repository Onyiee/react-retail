import { it, expect, describe } from 'vitest';
import {CartReducer} from "./CartContext.jsx";

describe("CartContext", () => {
    it("adds a new item to the cart with a quantity of 1", () => {
        const initialState = {items: []}
        const item = {
            id: "1",
            title: "Tea Cup",
            price: 5
        }

        const addToCart= {
           type: "ADD_ITEM", payload: item
        }
        expect(CartReducer(initialState, addToCart)).toEqual({
            items: [
                {
                    id: "1",
                    title: "Tea Cup",
                    price: 5,
                    quantity: 1
                }
            ]
        })
    })

    it("increases the quantity of an existing item by 1", () => {
        const initialState = {items: [ {
                id: "1",
                title: "Tea Cup",
                price: 5,
                quantity: 1
            }]}
        const item = {
            id: "1",
            title: "Tea Cup",
            price: 5
        }
        const addToCart= {
            type: "ADD_ITEM", payload: item
        }
        expect(CartReducer(initialState, addToCart)).toEqual(
            {
                items: [
                    {
                        id: "1",
                        title: "Tea Cup",
                        price: 5,
                        quantity: 1 + 1
                    }
                ]
            }
        )
    })

    it("removes an item from the cart", () => {
        const initialState  = {items: [ {
                id: "1",
                title: "Tea Cup",
                price: 5,
                quantity: 2
            },
                {
            id: "2",
            title: "Coffee Mug",
            price: 10,
            quantity: 1
            }
            ]}

        const removeItem ={ type: "REMOVE_ITEM", payload: {id: "1",
                title: "Tea Cup",
                price: 5,
                quantity: 2}}

        expect(CartReducer(initialState, removeItem)).toEqual(
            {
                items: [
                    {
                        id: "2",
                        title: "Coffee Mug",
                        price: 10,
                        quantity: 1
                    }
                ]
            }
        )
    })

    it("updates the quantity of an item", () => {
        const initialState  = {items: [ {
                id: "1",
                title: "Tea Cup",
                price: 5,
                quantity: 2
            },
                {
                    id: "2",
                    title: "Coffee Mug",
                    price: 10,
                    quantity: 1
                }
            ]}

        const updateQuantity = {type: "UPDATE_QUANTITY", payload: {
                id: "1",
                quantity: 5
            }}
        expect(CartReducer(initialState, updateQuantity)).toEqual(
            {
                items: [
                    {
                        id: "1",
                        title: "Tea Cup",
                        price: 5,
                        quantity: 5
                    },
                    {
                        id: "2",
                        title: "Coffee Mug",
                        price: 10,
                        quantity: 1
                    }
                ]
            }
        )
    })

    it("clears the cart", () => {
        const initialState  = {items: [ {
                id: "1",
                title: "Tea Cup",
                price: 5,
                quantity: 2
            },
                {
                    id: "2",
                    title: "Coffee Mug",
                    price: 10,
                    quantity: 1
                }
            ]}
        const clearedCart = {type: "CLEAR_CART"}
        expect(CartReducer(initialState, clearedCart)).toEqual({items: []})
    })
    })

