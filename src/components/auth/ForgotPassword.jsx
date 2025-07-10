import { useRef, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validation";

export default function ForgotPassword() {
    const formRef = useRef(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const { isValid, errors } = validateEmail(email);
        if (!isValid) {
            setError(errors[0]);
            scrollToForm();
            return;
        }

        setLoading(true);
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            setMessage("Check your email. We sent a reset link.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            scrollToForm();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
            <div ref={formRef} className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">
                    Reset password
                </h1>

                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200 font-semibold"
                    >
                        {loading ? "Sending..." : "Send reset link"}
                    </button>
                </form>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                {message && <p className="text-green-600 text-sm text-center">{message}</p>}

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        Return to login
                    </button>
                </div>
            </div>
        </div>
    );
}