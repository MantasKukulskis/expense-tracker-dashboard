import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); // info pranešimams
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);
        const auth = getAuth();

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Patikrinkite savo el. paštą, atsiųsime slaptažodžio atstatymo nuorodą.");
            setIsResettingPassword(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (isResettingPassword) {
        // Slaptažodžio atstatymo forma
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">
                        Atstatyti slaptažodį
                    </h1>

                    <form onSubmit={handlePasswordReset} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Įveskite savo el. paštą"
                            value={email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200 font-semibold"
                        >
                            {loading ? "Siunčiama..." : "Siųsti atstatymo nuorodą"}
                        </button>
                    </form>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-600 text-sm text-center">{message}</p>}

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                setMessage("");
                                setIsResettingPassword(false);
                            }}
                            disabled={loading}
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Grįžti į prisijungimą
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
                        💸 Expense Tracker
                    </h1>
                    <p className="text-sm text-gray-600">
                        {isRegistering
                            ? "Create a new account to get started"
                            : "Log in to your account"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200 font-semibold"
                    >
                        {loading
                            ? isRegistering
                                ? "Creating..."
                                : "Logging in..."
                            : isRegistering
                                ? "Create Account"
                                : "Login"}
                    </button>
                </form>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                {message && <p className="text-green-600 text-sm text-center">{message}</p>}

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setError("");
                            setMessage("");
                            setIsRegistering(!isRegistering);
                        }}
                        disabled={loading}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        {isRegistering
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </button>
                </div>

                {!isRegistering && (
                    <div className="text-center mt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                setMessage("");
                                setIsResettingPassword(true);
                            }}
                            className="text-sm text-red-600 hover:underline"
                        >
                            Pamiršai slaptažodį?
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}