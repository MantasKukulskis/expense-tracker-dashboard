import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase";
import {
    collection, addDoc, onSnapshot, query, where, orderBy, doc, deleteDoc
} from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

import { useTranslation } from 'react-i18next';

import BusinessChart from './BusinessChart';
import BusinessHeader from './BusinessHeader';
import BusinessFilter from './BusinessFilter';
import BusinessSummaryCard from './BusinessSummaryCard';
import BusinessTransactionForm from './BusinessTransactionForm';
import BusinessTransactionList from './BusinessTransactionList';
import LanguageSelector from '../common/LanguageSelector';

import { validateTransaction } from '../../utils/validation';

export function BusinessDashboard({ user }) {
    const { t } = useTranslation();
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [formError, setFormError] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'transactions'),
            where('userId', '==', user.uid),
            where('category', '==', 'business'),
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
            setFormError(Object.values(validation.errors).join('\n'));
            return;
        }

        const numericAmount = parseFloat(amount);
        const signedAmount = type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount);
        const created = new Date(date).getTime();

        await addDoc(collection(db, 'transactions'), {
            description,
            amount: signedAmount,
            type,
            created,
            userId: user.uid,
            category: 'business'
        });

        setDescription('');
        setAmount('');
        setType('income');
        setDate(new Date().toISOString().split('T')[0]);
        setFormError('');
    };

    const handleEdit = (tx) => {
        setEditingTransaction(tx);
        setDescription(tx.description);
        setAmount(Math.abs(tx.amount).toString());
        setType(tx.type);
        setDate(new Date(tx.created).toISOString().split('T')[0]);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(t("confirmDelete"));
        if (!confirmed) return;
        await deleteDoc(doc(db, 'transactions', id));
    };

    const monthOptions = [...new Set(transactions.map(tx => {
        const d = new Date(tx.created);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }))];

    const filtered = selectedMonth === 'all'
        ? transactions
        : transactions.filter(tx => {
            const d = new Date(tx.created);
            const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            return m === selectedMonth;
        });

    const income = filtered.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
    const expenses = filtered.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + tx.amount, 0);
    const balance = income + expenses;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 overflow-x-hidden">
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <BusinessHeader navigate={navigate} auth={auth} signOut={signOut} />
                    <LanguageSelector />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-[500px] bg-white rounded shadow p-4 space-y-4">
                        <BusinessTransactionForm
                            description={description} setDescription={setDescription}
                            amount={amount} setAmount={setAmount}
                            type={type} setType={setType}
                            date={date} setDate={setDate}
                            handleAddTransaction={handleAddTransaction}
                            editingTransaction={editingTransaction}
                            setEditingTransaction={setEditingTransaction}
                            formError={formError}
                        />
                        <BusinessSummaryCard income={income} expenses={expenses} balance={balance} />
                    </div>

                    <div className="md:flex-1 flex flex-col gap-4">
                        <div className="bg-white rounded shadow p-4 max-h-[400px] overflow-y-auto">
                            <BusinessTransactionList transactions={filtered} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <BusinessChart income={income} expenses={expenses} />
                        </div>
                    </div>
                </div>

                <BusinessFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} monthOptions={monthOptions} />
            </div>
        </div>
    );
}