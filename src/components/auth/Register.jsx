import { useRef, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validatePassword, validateEmail } from "../../utils/validation";

export default function Register() {
    const formRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const { isValid: isEmailValid, errors: emailErrors } = validateEmail(email);
        if (!isEmailValid) {
            setError(emailErrors[0]);
            scrollToForm();
            return;
        }

        const { isValid: isPasswordValid, errors: passwordErrors } = validatePassword(password);
        if (!isPasswordValid) {
            setError(passwordErrors[0]);
            scrollToForm();
            return;
        }

        if (!confirmPassword) {
            setError("Confirm password is required");
            scrollToForm();
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            scrollToForm();
            return;
        }

        setLoading(true);
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            navigate("/verify-email");
        } catch (err) {
            setError(err.message);
            scrollToForm();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
            <div ref={formRef} className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Create Account</h1>
                    <p className="text-sm text-gray-600">Register to start using the app</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200 font-semibold"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
}