import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
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
                console.log("Checking emailVerified:", verified);

                if (verified && !redirected) {
                    clearInterval(interval);
                    console.log("Redirecting...");
                    setRedirected(true);
                    navigate("/login"); // ← BUVO /, dabar konkretus nukreipimas
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
                Checking email verification...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
                <h1 className="text-2xl font-bold text-indigo-700">
                    Please verify your email
                </h1>
                <p className="text-gray-600">
                    A verification link was sent to <b>{auth.currentUser?.email}</b>.
                    <br />
                    Once confirmed, this page will automatically redirect.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => navigate("/register")}
                        className="text-indigo-600 hover:underline"
                    >
                        Back to Register
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-gray-600 hover:underline"
                    >
                        Go to Login
                    </button>
                </div>

                <button
                    onClick={async () => {
                        await auth.signOut();
                        navigate("/login");
                    }}
                    className="text-sm text-red-500 hover:underline"
                >
                    Logout and return to login
                </button>
            </div>
        </div>
    );
}