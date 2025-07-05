import React from 'react';

export default function Filter({ selectedMonth, setSelectedMonth, monthOptions }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <label className="block text-sm mb-1 font-medium text-gray-600">
                Filter by month:
            </label>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="all">All Months</option>
                {monthOptions.map(month => (
                    <option key={month} value={month}>
                        {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </option>
                ))}
            </select>
        </div>
    );
}