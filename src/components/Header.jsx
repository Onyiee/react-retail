import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";


export default function Header() {
    const [state] = useCart();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const totalQuantity = state.items.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    return (
        <header className="border-b border-slate-200 bg-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
                <Link
                    to="/"
                    className="shrink-0 whitespace-nowrap text-xl font-bold text-slate-900"
                >
                    React Retail
                </Link>

                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <Link
                        to="/"
                        className="shrink-0 whitespace-nowrap text-sm font-medium text-slate-700 hover:text-slate-950"
                    >
                        Products
                    </Link>


                    <Link
                        to="/cart"
                        className="shrink-0 whitespace-nowrap flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
                    >
                        Cart
                        <span
                            aria-label={`${totalQuantity} ${
                                totalQuantity === 1 ? "item" : "items"
                            }`}
                            className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-xs font-semibold text-white"
                        >
                            {totalQuantity}
                        </span>
                    </Link>


                    {isAuthenticated ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="shrink-0 whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                        >
                            Log out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="shrink-0 whitespace-nowrap rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-500"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
