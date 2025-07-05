import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    orderBy
} from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#34d399', '#f87171']; // Žalia - pajamos, Raudona - išlaidos

export function Dashboard({ user }) {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    const auth = getAuth();

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'transactions'),
            where('userId', '==', user.uid),
            orderBy('created', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTransactions(items);
        });

        return () => unsubscribe();
    }, [user]);

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        const numericAmount = parseFloat(amount);
        const signedAmount = type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount);

        try {
            await addDoc(collection(db, 'transactions'), {
                description,
                amount: signedAmount,
                type,
                created: Date.now(),
                userId: user.uid
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

    const chartData = [
        { name: 'Income', value: income },
        { name: 'Expenses', value: Math.abs(expenses) }
    ];

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("❌ Error during logout:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {/* Kairė pusė */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">💸 Expense Tracker</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </div>

                    <form onSubmit={handleAddTransaction} className="space-y-2 bg-white p-4 rounded-xl shadow">
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

                    <div className="grid grid-cols-3 text-center gap-2 bg-white p-4 rounded-xl shadow">
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

                    <ul className="divide-y bg-white p-4 rounded-xl shadow">
                        {transactions.map(t => (
                            <li key={t.id} className="py-2 flex justify-between text-sm">
                                <span>{t.description}</span>
                                <span className={t.amount < 0 ? "text-red-600" : "text-green-600"}>
                                    {t.amount < 0 ? "-" : "+"}€{Math.abs(t.amount).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Diagrama */}
                <div className="bg-white p-6 rounded-xl shadow h-fit">
                    <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
                        Diagram
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}