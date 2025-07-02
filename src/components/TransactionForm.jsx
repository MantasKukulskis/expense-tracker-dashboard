import { useState } from 'react';

export function TransactionForm({ onAdd }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedAmount = parseFloat(amount);
        if (!description || isNaN(parsedAmount)) return;

        onAdd({ description, amount: parsedAmount, type });
        setDescription('');
        setAmount('');
        setType('income');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
            <input
                type="text"
                placeholder="Description"
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 border rounded"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select
                className="w-full p-2 border rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
                Add Transaction
            </button>
        </form>
    );
}