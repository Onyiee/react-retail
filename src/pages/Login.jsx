
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        navigate("/checkout", { replace: true });
    };

    return (
        <div className="mx-auto max-w-md px-4 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Log in
            </h1>

            <p className="mt-2 text-slate-600">
                Log in to continue to checkout.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
            >
                <label className="block text-sm font-medium text-slate-700">
                    Email
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                    Password
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-amber-400 px-5 py-3 font-semibold text-slate-900 hover:bg-amber-500"
                >
                    Log in
                </button>
            </form>
        </div>
    );
}
