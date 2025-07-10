import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PersonalFilter({
    selectedMonth,
    setSelectedMonth,
    monthOptions = [],
    searchQuery,
    setSearchQuery,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo
}) {
    const { t } = useTranslation();

    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
            <div>
                <label className="block text-sm mb-1 font-medium text-gray-600">
                    {t("filterByMonth")}
                </label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">{t("allMonths")}</option>
                    {Array.isArray(monthOptions) && monthOptions.length > 0 &&
                        monthOptions.map(month => (
                            <option key={month} value={month}>
                                {new Date(month + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label className="block text-sm mb-1 font-medium text-gray-600">
                    {t("filterByDescription")}
                </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder={t("descriptionPlaceholder")}
                />
            </div>

            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-sm mb-1 font-medium text-gray-600">
                        {t("dateFrom")}
                    </label>
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm mb-1 font-medium text-gray-600">
                        {t("dateTo")}
                    </label>
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>
        </div>
    );
}