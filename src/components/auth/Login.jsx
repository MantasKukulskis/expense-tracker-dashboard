import { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { validateEmail } from "../../utils/validation";
import LanguageSelector from "../common/LanguageSelector";

export default function Login() {
    const { t } = useTranslation();
    const formRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const { isValid: isEmailValid, errors: emailErrors } = validateEmail(email);
        if (!isEmailValid) {
            setError(t("invalidEmail"));
            scrollToForm();
            return;
        }

        if (!password) {
            setError(t("passwordRequired") || "Password is required");
            scrollToForm();
            return;
        }

        setLoading(true);
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                setError(t("verifyEmail"));
                scrollToForm();
                return;
            }
            navigate("/");
        } catch (err) {
            setError(t("invalidLogin"));
            scrollToForm();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
            <div className="absolute top-4 right-4">
                <LanguageSelector />
            </div>

            <div ref={formRef} className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 relative z-10">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
                        💸 Expense Tracker
                    </h1>
                    <p className="text-sm text-gray-600">{t("loginSubtitle")}</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder={t("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder={t("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            {t("forgotPassword")}
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200 font-semibold"
                    >
                        {loading ? t("loggingIn") : t("login")}
                    </button>
                </form>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {t("noAccount")}{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 hover:underline font-medium"
                        >
                            {t("registerHere")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}