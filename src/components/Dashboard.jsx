import { useState } from 'react';
import { TransactionForm } from './TransactionForm';
import { BalanceCard } from './BalanceCard';

export function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };

    const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Expense Tracker</h1>
            <BalanceCard income={income} expenses={expenses} balance={balance} />
            <TransactionForm onAdd={addTransaction} />
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
                <ul className="space-y-2">
                    {transactions.map((t, index) => (
                        <li key={index} className="flex justify-between bg-gray-100 p-2 rounded">
                            <span>{t.description}</span>
                            <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                                {t.type === 'expense' ? '-' : '+'}€{t.amount.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}