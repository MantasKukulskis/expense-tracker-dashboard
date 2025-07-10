import React from 'react';

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
    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
            <div>
                <label className="block text-sm mb-1 font-medium text-gray-600">
                    Filter by month:
                </label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">All Months</option>
                    {Array.isArray(monthOptions) && monthOptions.length > 0 &&
                        monthOptions.map(month => (
                            <option key={month} value={month}>
                                {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label className="block text-sm mb-1 font-medium text-gray-600">
                    Filter by description:
                </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="e.g. Maxima, Circle K..."
                />
            </div>

            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="block text-sm mb-1 font-medium text-gray-600">
                        Date from:
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
                        Date to:
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