
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function CartPage() {
    const [state, dispatch] = useCart();

    if (state.items.length === 0) {
        return (
            <div className="mx-auto max-w-4xl px-6 py-12">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Your Cart
                </h1>

                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-lg font-medium text-slate-700">
                        Your cart is empty.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        Browse our products and find something you love.
                    </p>
                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition-colors hover:bg-slate-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const totalPrice = state.items.reduce((acc, current) => {
        return acc + current.price * current.quantity;
    }, 0);

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Your Cart
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Review your items before checkout.
                    </p>
                </div>

                <Link
                    to="/"
                    className="text-sm font-medium text-slate-700 underline underline-offset-4 transition-colors hover:text-slate-950"
                >
                    Continue Shopping
                </Link>
            </div>

            <div className="mt-8 space-y-4">
                {state.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="min-w-0">
                            <h2 className="text-base font-semibold text-slate-900">
                                {item.title}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Unit price: ${item.price.toFixed(2)}
                            </p>

                            <p className="mt-1 text-sm text-slate-600">
                                Quantity: {item.quantity}
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                            <p className="font-semibold text-slate-900">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>

                            <button
                                type="button"
                                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between gap-4">
          <span className="text-base font-medium text-slate-600">
            Total
          </span>
                    <span className="text-2xl font-bold text-slate-900">
            ${totalPrice.toFixed(2)}
          </span>
                </div>

                <p className="mt-2 text-right text-xs text-slate-500">
                    Shipping and taxes calculated at checkout.
                </p>

                <button
                    type="button"
                    disabled
                    className="mt-6 w-full cursor-not-allowed rounded-lg bg-slate-300 px-5 py-3 font-semibold text-slate-600 sm:w-auto sm:min-w-48"
                >
                    Checkout (Coming Soon)
                </button>
            </div>
        </div>
    );
}
