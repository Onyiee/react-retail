import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../context/CartContext.jsx";

const fetchProduct = async (id)=> {
    const  res = await fetch(`http://localhost:5174/api/products/${id}`);
    if (!res.ok) {
        throw new Error ("Failed to fetch product");
    }
    return await res.json();
}


export default function ProductDetailPage() {
    const [state, dispatch] = useCart();
    state.items.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);
    const { id } = useParams();

    const {data, isPending, error} = useQuery({
        queryKey: ["product",id],
        queryFn: ()=> fetchProduct(id),
    });

    if(isPending) return <p className="p-6 text-slate-600">Loading product…</p>
    if (error) return <p className="p-6 text-red-600">Error: {error.message} </p>


    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
                    >
                        ← Back to products
                    </Link>

                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex min-h-80 items-center justify-center bg-slate-100 p-8 md:p-12">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="max-h-96 w-full rounded-lg object-contain"
                            />
                        </div>

                        <div className="flex flex-col items-start p-6 md:p-10">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                                {data.category}
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                {data.title}
                            </h1>

                            <p className="mt-5 leading-7 text-slate-600">
                                {data.description}
                            </p>

                            <p className="mt-8 text-3xl font-bold text-slate-900">
                                ${data.price.toFixed(2)}
                            </p>

                            <button
                                onClick={() =>
                                    dispatch({
                                        type: "ADD_ITEM",
                                        payload: data,
                                    })
                                }
                                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}