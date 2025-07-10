import React from 'react';
import { useTranslation } from 'react-i18next';

export default function BusinessFilter({ selectedMonth, setSelectedMonth, monthOptions }) {
    const { t } = useTranslation();

    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-2">
            <label className="block text-sm font-medium text-gray-600">
                {t("filterByMonth")}
            </label>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="all">{t("allMonths")}</option>
                {monthOptions.map(month => (
                    <option key={month} value={month}>
                        {new Date(month + '-01').toLocaleString('en-US', {
                            month: 'long',
                            year: 'numeric'
                        })}
                    </option>
                ))}
            </select>
        </div>
    );
}