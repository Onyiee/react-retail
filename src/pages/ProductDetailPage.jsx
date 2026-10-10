import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchProduct = async (id)=> {
    const  res = await fetch(`http://localhost:5174/api/products/${id}`);
    if (!res.ok) {
        throw new Error ("Failed to fetch product");
    }
    return await res.json();
}


export default function ProductDetailPage() {
    const { id } = useParams();

    const {data, isPending, error} = useQuery({
        queryKey: ["product",id],
        queryFn: ()=> fetchProduct(id),
    });

    if(isPending) return <p className="p-6 text-slate-600">Loading product…</p>
    if (error) return <p className="p-6 text-red-600">Error: {error.message} </p>

    return (
        <div>
            <Link to="/">Back to products</Link>
            <h1>{data.title}</h1>
            <img src={data.image} alt={data.title} className="w-full max-w-sm rounded-lg" />
            <p className="mt-4 text-slate-600">{data.description}</p>
            <p className="mt-2 text-sm text-slate-500">{data.category}</p>
            <p className="mt-4 text-xl font-bold text-slate-900">
                ${data.price.toFixed(2)}
            </p>
        </div>
    )
}