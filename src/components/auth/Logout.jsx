import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Logout() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
            <LogOut size={18} />
            <span className="text-sm">{t("logout")}</span>
        </button>
    );
}