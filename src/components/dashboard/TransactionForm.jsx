import React from 'react';

export default function TransactionForm({
    description,
    setDescription,
    amount,
    setAmount,
    type,
    setType,
    date,
    setDate,
    handleAddTransaction
}) {
    return (
        <form onSubmit={handleAddTransaction} className="space-y-4 bg-white p-4 rounded shadow">
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div>
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div>
                <label>Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div>
                <label>Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Add Transaction
            </button>
        </form>
    );
}