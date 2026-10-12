import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { useCart } from "../context/CartContext.jsx";

export default function CheckoutPage() {
    const [state, dispatch] = useCart();

    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        email: "",
        address: "",
    })

    const handleSubmit = (e)=> {
        e.preventDefault();
        mutation.mutate()
    }

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
            dispatch({
                type: "CLEAR_CART",
            })
            setCustomerDetails({
                name: "",
                email: "",
                address: "",
            })
        },
    });

    const totalPrice = state.items.reduce((acc, current) => {
        return acc + current.price * current.quantity;
    }, 0);

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Checkout</h1>
            <p className="mt-2 text-slate-600">Enter your details to complete your order.</p>

            {!mutation.isSuccess && (
                <>
                    {state.items.map((item) => (
                        <div key={item.id}>
                            <p>{item.title}</p>
                            <p>{item.quantity}</p>
                            <p>
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                </>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <label className="block text-sm font-medium text-slate-700">
                    Name:
                    <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    value={customerDetails.name}
                    onChange={(e) => {
                        setCustomerDetails((prevDetails) => ({
                            ...prevDetails,
                            name: e.target.value,
                        }));
                    }}/>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                    Email:
                    <input
                    type="email"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    value={customerDetails.email}
                    onChange={(e) => {
                        setCustomerDetails((prevDetails) => ({
                            ...prevDetails,
                            email: e.target.value,
                        }));
                    }}/>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                    Address:
                    <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    value={customerDetails.address}
                    onChange={(e) => {
                        setCustomerDetails((prevDetails) => ({
                            ...prevDetails,
                            address: e.target.value,
                        }));
                    }}/>
                </label>
                <button
                    type="submit" disabled={mutation.isPending}
                    className="w-full rounded-lg bg-amber-400 px-5 py-3 font-semibold text-slate-900 hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {mutation.isPending ? "Placing Order... ": "Place Order"}
                </button>
                {mutation.isSuccess && mutation.data && (
                    <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                        <h2 className="text-lg font-semibold text-green-800">
                            Order placed successfully!
                        </h2>

                        <p className="mt-2 text-sm text-green-700">
                            Order number: #{mutation.data.id}
                        </p>

                        <p className="mt-1 text-sm text-green-700">
                            Order total: $
                            {mutation.data.items
                                .reduce((total, item) => {
                                    return total + item.price * item.quantity;
                                }, 0)
                                .toFixed(2)}
                        </p>
                    </div>
                )}
                {mutation.isError && <p>{mutation.error.message}</p>}
            </form>
        </div>

    )
}