import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useTranslation } from 'react-i18next';

export default function BudgetTrackerBox({ user, selectedMonth, totalSpent, onBudgetChange, monthOptions, onMonthChange }) {
    const { t } = useTranslation();
    const [budget, setBudget] = useState(null);
    const [input, setInput] = useState('');
    const [editing, setEditing] = useState(false);

    const remaining = budget != null ? (budget - totalSpent) : null;

    useEffect(() => {
        if (!user || !selectedMonth) return;
        const fetchBudget = async () => {
            const ref = doc(db, 'budgets', `${user.uid}_${selectedMonth}`);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                const data = snap.data();
                setBudget(data.amount);
                setInput(data.amount);
            } else {
                setBudget(null);
                setInput('');
            }
        };
        fetchBudget();
    }, [user, selectedMonth]);

    const handleSave = async () => {
        const parsed = parseFloat(input);
        if (isNaN(parsed) || !selectedMonth) {
            alert(t("invalidAmountOrMonth"));
            return;
        }
        const ref = doc(db, 'budgets', `${user.uid}_${selectedMonth}`);
        await setDoc(ref, {
            userId: user.uid,
            month: selectedMonth,
            amount: parsed
        });
        setBudget(parsed);
        setEditing(false);
        if (onBudgetChange) onBudgetChange(parsed);
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 mb-6 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2 w-full md:w-1/3">
                    <label className="text-sm font-medium text-gray-600">{t("filterByMonth")}</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => onMonthChange(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">{t("chooseMonth")}</option>
                        {(Array.isArray(monthOptions) ? monthOptions : []).map(month => (
                            <option key={month} value={month}>
                                {new Date(month + '-01').toLocaleString(t("locale"), { month: 'long', year: 'numeric' })}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2 w-full md:w-2/3">
                    {editing ? (
                        <>
                            <input
                                type="number"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="border p-2 rounded w-24"
                            />
                            <button onClick={handleSave} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                {t("save")}
                            </button>
                            <button onClick={() => setEditing(false)} className="text-sm text-gray-600 underline">
                                {t("cancel")}
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-gray-700">
                                {t("budgetFor")} <strong>{selectedMonth}</strong>: <strong>€{budget ?? '—'}</strong>
                            </p>
                            <button onClick={() => setEditing(true)} className="text-blue-600 underline text-sm">
                                {budget != null ? t("editBudget") : t("setBudget")}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {budget != null && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                    <p>{t("totalSpent")}: <strong>€{totalSpent.toFixed(2)}</strong></p>
                    <p>
                        {t("remainingBudget")}:{" "}
                        <strong className={`font-semibold ${remaining < 0
                            ? 'text-red-600'
                            : remaining < 50
                                ? 'text-yellow-600 animate-pulse'
                                : 'text-green-600'
                            }`}>
                            €{remaining.toFixed(2)}
                        </strong>
                        {remaining < 50 && (
                            <span className="ml-2 text-xs text-red-500">⚠️ {t("lowBalanceWarning")}</span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
}