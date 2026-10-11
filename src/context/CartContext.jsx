import {createContext, useReducer, useContext} from "react";

const CartContext = createContext(null);
const initialCartState = {items: []}

export function CartReducer(state, action) {
    console.log("Cart action:", action);
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (!existingItem) {
                const newItem = {...action.payload, quantity: 1}
                const updatedItems = [...state.items, newItem];
                console.log("Updated cart items:", updatedItems);
                return {
                    items: updatedItems,
                };
            }

            const updatedItems = state.items.map((item) =>
                item.id === existingItem.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );
            return {
                items: updatedItems,
            };
        }

        case "REMOVE_ITEM": {
            const updatedItems = state.items.filter(
                (item) => item.id !== action.payload.id
            );

            return {
                items: updatedItems,
            };
        }

        case "UPDATE_QUANTITY": {
            const updatedItems = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: action.payload.quantity,
                    };
                }

                return item;
            });

            return {
                items: updatedItems,
            };
        }

        case "CLEAR_CART":
            return {
                items: []
            };

        default: return state;
    }
}

export function CartProvider ({children}) {
    const [state, dispatch] = useReducer(CartReducer, initialCartState);
    console.log("Current cart state:", state);

    return (
        <CartContext.Provider value={[state, dispatch]}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}