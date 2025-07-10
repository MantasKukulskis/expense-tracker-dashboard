import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function VerifyEmail() {
    const { t } = useTranslation();
    const auth = getAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);
    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            const user = auth.currentUser;

            if (user) {
                await user.reload();
                const verified = user.emailVerified;

                if (verified && !redirected) {
                    clearInterval(interval);
                    setRedirected(true);
                    navigate("/", { replace: true });
                } else {
                    setChecking(false);
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [auth, navigate, redirected]);

    if (checking) {
        return (
            <div className="text-center mt-20 text-gray-600">
                {t("checkingVerification")}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
                <h1 className="text-2xl font-bold text-indigo-700">
                    {t("pleaseVerify")}
                </h1>
                <p className="text-gray-600">
                    {t("emailSent")} <b>{auth.currentUser?.email}</b>.
                    <br />
                    {t("autoRedirect")}
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/register")}
                        className="text-indigo-600 hover:underline"
                    >
                        {t("backToRegister")}
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-gray-600 hover:underline"
                    >
                        {t("goToLogin")}
                    </button>
                </div>
            </div>
        </div>
    );
}