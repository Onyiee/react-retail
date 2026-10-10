import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
    const res = await fetch("http://localhost:5174/api/products");

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return await res.json();
};

export default function ProductsPage () {
    const {data, isPending, error} = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    if (isPending) return <p className="p-6 text-slate-600">Loading products…</p>;
    if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">React Retail</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((product) => (
                        <Link key={product.id}  to={`/products/${product.id}`}>
                            <div
                                className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="h-40 bg-slate-100 rounded mb-3 flex items-center justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="object-cover h-full w-full rounded"
                                    />
                                </div>

                                <h2 className="font-semibold text-slate-800">{product.title}</h2>
                                <p className="text-slate-500 text-sm">{product.category}</p>

                                <p className="mt-2 font-semibold text-slate-900">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    );
}