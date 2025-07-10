import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function BusinessTransactionList({ transactions, onEdit, onDelete }) {
    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                <img
                    src="/img/no_data.png"
                    alt="No transactions"
                    className="w-40 h-40 mb-4"
                />
                <p className="text-lg font-semibold">You have no transactions yet</p>
                <p className="text-sm text-gray-400 mb-6">Start tracking your business income & expenses</p>

                <div className="flex items-center gap-2">
                    <span className="text-3xl text-blue-600 animate-bounce">👈</span>
                    <p className="text-sm text-blue-600 font-medium">Add your first transaction on the left</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Transactions</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-blue-100 text-left text-gray-700">
                        <th className="py-3 px-4 rounded-tl-lg">Description</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 rounded-tr-lg">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => {
                        const date = new Date(tx.created).toLocaleDateString();
                        return (
                            <tr key={tx.id} className="border-t hover:bg-gray-50 transition">
                                <td className="py-3 px-4">{tx.description}</td>
                                <td className={`py-3 px-4 font-semibold ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    {Math.abs(tx.amount).toFixed(2)}
                                </td>
                                <td className="py-3 px-4 capitalize">{tx.type}</td>
                                <td className="py-3 px-4">{date}</td>
                                <td className="py-3 px-4 space-x-3">
                                    <button onClick={() => onEdit(tx)} className="text-blue-600 hover:text-blue-800">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => onDelete(tx.id)} className="text-red-600 hover:text-red-800">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}