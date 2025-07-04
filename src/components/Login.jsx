import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const auth = getAuth();

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-4">
            <h2 className="text-xl font-bold text-center">
                {isRegistering ? "Register" : "Login"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="w-full p-2 border rounded"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="w-full p-2 border rounded"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded"
                    disabled={loading}
                >
                    {loading ? (isRegistering ? "Creating..." : "Logging in...") : (isRegistering ? "Create Account" : "Login")}
                </button>
            </form>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                onClick={() => {
                    setError("");
                    setIsRegistering(!isRegistering);
                }}
                className="text-sm text-blue-500 underline"
                disabled={loading}
            >
                {isRegistering
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
            </button>
        </div>
    );
}