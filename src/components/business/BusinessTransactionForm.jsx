import { useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";

export default function BusinessTransactionForm({
    description, setDescription,
    amount, setAmount,
    type, setType,
    date, setDate,
    handleAddTransaction,
    editingTransaction, setEditingTransaction,
    formError
}) {
    const { t } = useTranslation();
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingTransaction) {
                const numericAmount = parseFloat(amount);
                const signedAmount = type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount);
                const created = new Date(date).getTime();

                const docRef = doc(db, "transactions", editingTransaction.id);
                await updateDoc(docRef, {
                    description,
                    amount: signedAmount,
                    type,
                    created
                });

                setEditingTransaction(null);
                setDescription('');
                setAmount('');
                setType('income');
                setDate(new Date().toISOString().split('T')[0]);
            } else {
                await handleAddTransaction({ description, amount, type, date });
            }
        } catch (error) {
            console.error("❌ Error submitting business transaction:", error);
        }
    };

    const handleFocus = () => {
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    };

    return (
        <div className="min-h-screen pt-6 px-4 overflow-auto" ref={formRef}>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl mx-auto">
                <h2 className="text-xl font-semibold">
                    {editingTransaction ? `✏️ ${t("editTransaction")}` : `➕ ${t("addTransaction")}`}
                </h2>

                <input
                    type="text"
                    placeholder={t("description")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onFocus={handleFocus}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder={t("amount")}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                    onFocus={handleFocus}
                    className="w-full p-2 border rounded"
                />

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    onFocus={handleFocus}
                    className="w-full p-2 border rounded"
                >
                    <option value="income">{t("income")}</option>
                    <option value="expense">{t("expense")}</option>
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onFocus={handleFocus}
                    className="w-full p-2 border rounded"
                />

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                    {editingTransaction ? t("saveChanges") : t("addTransaction")}
                </button>

                {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}
            </form>
        </div>
    );
}