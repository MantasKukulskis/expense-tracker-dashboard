import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
    const { i18n } = useTranslation();

    const handleChange = (e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem("language", e.target.value);
    };

    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <label htmlFor="language" className="font-medium">
                Language:
            </label>
            <select
                id="language"
                value={i18n.language}
                onChange={handleChange}
                className="border p-1 rounded"
            >
                <option value="en">English</option>
                <option value="lt">Lietuvių</option>
            </select>
        </div>
    );
}