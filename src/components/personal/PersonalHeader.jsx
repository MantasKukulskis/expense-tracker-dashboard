import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home as HomeIcon } from 'lucide-react';
import Logout from '../auth/Logout';

export default function PersonalHeader({ navigate }) {
    const { t } = useTranslation();

    return (
        <header className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition"
                >
                    <HomeIcon size={20} />
                    <span>{t("home")}</span>
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t("personalTracker")}</h1>
            </div>

            <Logout />
        </header>
    );
}