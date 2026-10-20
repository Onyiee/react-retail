import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "../context/CartContext.jsx";

export default function CheckoutPage() {
    const [state, dispatch] = useCart();

    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        email: "",
        address: "",
    });

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("http://localhost:5174/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: state.items,
                    customer: customerDetails,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to create order");
            }

            return res.json();
        },
        onSuccess: () => {
            dispatch({ type: "CLEAR_CART" });
        },
    });

    const totalPrice = state.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    if (mutation.isSuccess && mutation.data) {
        const orderTotal = mutation.data.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        return (
            <div className="mx-auto max-w-2xl px-4 py-10">
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-green-800">
                        Order placed successfully!
                    </h1>

                    <p className="mt-3 text-green-700">
                        Thank you for your order.
                    </p>

                    <p className="mt-4 text-sm text-green-700">
                        Order number: #{mutation.data.id}
                    </p>

                    <p className="mt-1 text-sm text-green-700">
                        Order total: ${orderTotal.toFixed(2)}
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (state.items.length === 0) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-10">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Checkout
                </h1>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Your cart is empty
                    </h2>

                    <p className="mt-2 text-slate-600">
                        Add some products before proceeding to checkout.
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-slate-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (state.items.length === 0 || mutation.isPending) {
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Checkout
            </h1>

            <p className="mt-2 text-slate-600">
                Enter your details to complete your order.
            </p>

            <div className="mt-6 space-y-3">
                {state.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between gap-4"
                    >
                        <div>
                            <p className="font-medium text-slate-900">
                                {item.title}
                            </p>
                            <p className="text-sm text-slate-500">
                                Quantity: {item.quantity}
                            </p>
                        </div>

                        <p className="font-medium text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}

                <div className="border-t border-slate-200 pt-4 text-right font-bold text-slate-900">
                    Total: ${totalPrice.toFixed(2)}
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
            >
                <label className="block text-sm font-medium text-slate-700">
                    Name:
                    <input
                        type="text"
                        required
                        autoComplete="name"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        value={customerDetails.name}
                        onChange={(e) =>
                            setCustomerDetails((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                    Email:
                    <input
                        type="email"
                        required
                        autoComplete="email"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        value={customerDetails.email}
                        onChange={(e) =>
                            setCustomerDetails((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                    />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                    Address:
                    <input
                        type="text"
                        required
                        autoComplete="street-address"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        value={customerDetails.address}
                        onChange={(e) =>
                            setCustomerDetails((prev) => ({
                                ...prev,
                                address: e.target.value,
                            }))
                        }
                    />
                </label>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full rounded-lg bg-amber-400 px-5 py-3 font-semibold text-slate-900 hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {mutation.isPending ? "Placing Order..." : "Place Order"}
                </button>

                {mutation.isError && (
                    <p role="alert" className="text-sm text-red-600">
                        {mutation.error.message}
                    </p>
                )}
            </form>
        </div>
    );
}
