import { useEffect, useState } from 'react';
import { db } from "../../firebase";
import { collection, addDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

import Chart from "./Chart";
import Filter from "./Filter";
import SummaryCard from "./SummaryCard";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export function Dashboard({ user }) {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    // Naujas state datai
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // yyyy-MM-dd formatu
    });

    const [selectedMonth, setSelectedMonth] = useState('all');

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
        if (!description || !amount || !date) return;

        const numericAmount = parseFloat(amount);
        const signedAmount = type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount);

        try {
            const createdTimestamp = new Date(date).getTime();

            await addDoc(collection(db, 'transactions'), {
                description,
                amount: signedAmount,
                type,
                created: createdTimestamp,
                userId: user.uid
            });

            setDescription('');
            setAmount('');
            setType('income');

            // Nustatom datą atgal į šiandieną
            const today = new Date();
            setDate(today.toISOString().split('T')[0]);
        } catch (error) {
            console.error("❌ Error adding transaction:", error);
        }
    };

    const monthOptions = Array.from(new Set(
        transactions.map(t => {
            const dateObj = new Date(t.created);
            return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
        })
    ));

    const filteredTransactions = selectedMonth === 'all'
        ? transactions
        : transactions.filter(t => {
            const dateObj = new Date(t.created);
            const month = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
            return month === selectedMonth;
        });

    const income = filteredTransactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const expenses = filteredTransactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = income + expenses;

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

                    <Filter
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        monthOptions={monthOptions}
                    />

                    <TransactionForm
                        description={description}
                        setDescription={setDescription}
                        amount={amount}
                        setAmount={setAmount}
                        type={type}
                        setType={setType}
                        date={date}
                        setDate={setDate}
                        handleAddTransaction={handleAddTransaction}
                    />

                    <SummaryCard income={income} expenses={expenses} balance={balance} />
                    <TransactionList transactions={filteredTransactions} />
                </div>

                <Chart income={income} expenses={expenses} />
            </div>
        </div>
    );
}