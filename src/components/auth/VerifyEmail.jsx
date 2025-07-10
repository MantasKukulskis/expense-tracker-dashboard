import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const interval = setInterval(async () => {
            const user = auth.currentUser;

            if (user) {
                await user.reload();
                const verified = user.emailVerified;
                console.log("Checking emailVerified:", verified);

                if (verified) {
                    clearInterval(interval);
                    console.log("Redirecting...");
                    navigate("/");
                } else {
                    setChecking(false);
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleBackToLogin = async () => {
        await signOut(auth);
        navigate("/login");
    };

    if (checking) {
        return (
            <div className="text-center mt-20 text-gray-600">Checking email verification...</div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
                <h1 className="text-2xl font-bold text-indigo-700">Please verify your email</h1>
                <p className="text-gray-600">
                    A verification link was sent to <b>{auth.currentUser?.email}</b>.<br />
                    Once confirmed, this page will automatically redirect.
                </p>
                <button
                    onClick={handleBackToLogin}
                    className="mt-4 text-indigo-600 hover:underline"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}