import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const fetchProducts = async () => {
    const res = await fetch("http://localhost:5174/api/products");

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return await res.json();
};

export default function ProductsPage() {
    const { data, isPending, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    const [state] = useCart();

    const totalQuantity = state.items.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    if (isPending) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-12">
                <p className="text-slate-600" role="status">
                    Loading products…
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-12">
                <p className="text-red-600" role="alert">
                    Unable to load products: {error.message}
                </p>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-tight text-slate-900"
                    >
                        React Retail<span className="text-indigo-600">.</span>
                    </Link>

                    <Link
                        to="/cart"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                    >
                        View Cart
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
              {totalQuantity}
            </span>
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
                <section className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                        Find your next favourite
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Explore our collection
                    </h1>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        Browse our products and discover something worth adding to your
                        cart.
                    </p>

                    <p className="mt-5 text-sm text-slate-500">
                        {data.length} products available
                    </p>
                </section>

                <section
                    aria-label="Product catalogue"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {data.map((product) => (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            onClick={() => console.log("Product clicked:", product.id)}
                            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                        >
                            <div className="flex h-56 items-center justify-center overflow-hidden bg-slate-100 p-5">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    loading="lazy"
                                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-5">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                    {product.category}
                                </p>

                                <h2 className="mt-2 line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900">
                                    {product.title}
                                </h2>

                                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                                    <p className="text-lg font-bold text-slate-900">
                                        ${product.price.toFixed(2)}
                                    </p>

                                    <span className="text-sm font-medium text-indigo-600 transition-colors group-hover:text-indigo-800">
                    View details →
                  </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>

            <footer className="mt-12 border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-slate-500">
                    React Retail · Built with React
                </div>
            </footer>
        </div>
    );
}
