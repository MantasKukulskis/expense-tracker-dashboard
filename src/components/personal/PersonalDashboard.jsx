import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase";
import {
    collection, addDoc, onSnapshot, query, where, orderBy, doc,
    deleteDoc
} from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

import PersonalHeader from './PersonalHeader';
import PersonalFilter from './PersonalFilter';
import BudgetTrackerBox from './BudgetTrackerBox';
import PersonalTransactionForm from './PersonalTransactionForm';
import PersonalSummaryCard from './PersonalSummaryCard';
import PersonalTransactionList from './PersonalTransactionList';
import PersonalChart from './PersonalChart';

import { validateTransaction } from '../../utils/validation';

export function PersonalDashboard({ user }) {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('food');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState(null);
    const [formError, setFormError] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'transactions'),
            where('userId', '==', user.uid),
            where('category', '==', 'personal'),
            orderBy('created', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTransactions(items);
        });

        return () => unsubscribe();
    }, [user]);

    const handleAddTransaction = async ({ description, amount, type, date }) => {
        const validation = validateTransaction({ description, amount, date });
        if (!validation.isValid) {
            setFormError(Object.values(validation.errors)[0]);
            return;
        }

        try {
            await addDoc(collection(db, 'transactions'), {
                description,
                amount: parseFloat(amount),
                type,
                created: new Date(date).getTime(),
                userId: user.uid,
                category: 'personal'
            });

            setDescription('');
            setAmount('');
            setType('food');
            setDate(new Date().toISOString().split('T')[0]);
            setFormError('');
        } catch (error) {
            console.error("❌ Firestore error:", error);
            setFormError("Failed to add transaction. Please try again.");
        }
    };

    const handleEdit = (tx) => {
        setEditingTransaction(tx);
        setDescription(tx.description);
        setAmount(tx.amount.toString());
        setType(tx.type);
        setDate(new Date(tx.created).toISOString().split('T')[0]);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this transaction?')) {
            await deleteDoc(doc(db, 'transactions', id));
        }
    };

    const monthOptions = [];
    const currentYear = new Date().getFullYear();
    const futureYears = 2;
    for (let y = currentYear; y <= currentYear + futureYears; y++) {
        for (let m = 1; m <= 12; m++) {
            monthOptions.push(`${y}-${String(m).padStart(2, '0')}`);
        }
    }

    const filtered = transactions.filter(tx => {
        const d = new Date(tx.created);
        const txMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const matchesMonth = selectedMonth === '' || txMonth === selectedMonth;
        const matchesDescription = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDateFrom = !dateFrom || d >= new Date(dateFrom);
        const matchesDateTo = !dateTo || d <= new Date(dateTo);
        return matchesMonth && matchesDescription && matchesDateFrom && matchesDateTo;
    });

    const totalSpent = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    const balance = monthlyBudget != null ? (monthlyBudget - totalSpent) : null;

    const food = filtered.filter(tx => tx.type === 'food').reduce((s, t) => s + t.amount, 0);
    const fuel = filtered.filter(tx => tx.type === 'fuel').reduce((s, t) => s + t.amount, 0);
    const entertainment = filtered.filter(tx => tx.type === 'entertainment').reduce((s, t) => s + t.amount, 0);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
                <PersonalHeader navigate={navigate} auth={auth} signOut={signOut} />

                <h2 className="text-lg font-semibold text-gray-700">Monthly Budget Planning</h2>
                <BudgetTrackerBox
                    user={user}
                    selectedMonth={selectedMonth}
                    totalSpent={totalSpent}
                    onBudgetChange={setMonthlyBudget}
                    onMonthChange={setSelectedMonth}
                    monthOptions={monthOptions}
                />

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-[500px] bg-white rounded shadow p-4">
                        <PersonalTransactionForm
                            description={description} setDescription={setDescription}
                            amount={amount} setAmount={setAmount}
                            type={type} setType={setType}
                            date={date} setDate={setDate}
                            handleAddTransaction={handleAddTransaction}
                            editingTransaction={editingTransaction}
                            setEditingTransaction={setEditingTransaction}
                            formError={formError}
                        />
                    </div>

                    <div className="md:flex-1 bg-white rounded shadow p-4 max-h-[400px] overflow-y-auto">
                        <PersonalTransactionList
                            transactions={filtered}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-[500px] bg-white rounded shadow p-4">
                        <PersonalSummaryCard food={food} fuel={fuel} entertainment={entertainment} />
                    </div>
                    <div className="md:flex-1 bg-white rounded shadow p-4">
                        <PersonalChart categoryTotals={{ Food: food, Fuel: fuel, Entertainment: entertainment }} />
                    </div>
                </div>

                <PersonalFilter
                    selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}
                    monthOptions={monthOptions}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    dateFrom={dateFrom} setDateFrom={setDateFrom}
                    dateTo={dateTo} setDateTo={setDateTo}
                />
            </div>
        </div>
    );
}