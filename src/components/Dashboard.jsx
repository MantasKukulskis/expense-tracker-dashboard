import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    onSnapshot,
    query
} from 'firebase/firestore';

export function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    const transactionsRef = collection(db, 'transactions');

    useEffect(() => {
        const q = query(transactionsRef);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTransactions(items);
        });

        return () => unsubscribe();
    }, []);

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        const numericAmount = parseFloat(amount);
        const signedAmount = type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount);

        try {
            await addDoc(transactionsRef, {
                description,
                amount: signedAmount,
                type, // <- būtina pridėti!
                created: Date.now()
            });

            setDescription('');
            setAmount('');
            setType('income');
        } catch (error) {
            console.error("❌ Error adding transaction:", error);
        }
    };

    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = income + expenses;

    return (
        <div className="max-w-md mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold text-center">💸 Expense Tracker</h1>

            {/* Form */}
            <form onSubmit={handleAddTransaction} className="space-y-2">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    Add Transaction
                </button>
            </form>

            {/* Summary */}
            <div className="grid grid-cols-3 text-center gap-2">
                <div>
                    <h2 className="text-sm text-gray-500">Income</h2>
                    <p className="text-green-600 font-bold">€ {income.toFixed(2)}</p>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500">Expenses</h2>
                    <p className="text-red-600 font-bold">€ {Math.abs(expenses).toFixed(2)}</p>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500">Balance</h2>
                    <p className="font-bold text-blue-700">€ {balance.toFixed(2)}</p>
                </div>
            </div>

            {/* Transaction list */}
            <ul className="divide-y">
                {transactions.map(t => (
                    <li key={t.id} className="py-2 flex justify-between">
                        <span>{t.description}</span>
                        <span className={t.amount < 0 ? "text-red-600" : "text-green-600"}>
                            {t.amount < 0 ? "-" : "+"}€{Math.abs(t.amount).toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}