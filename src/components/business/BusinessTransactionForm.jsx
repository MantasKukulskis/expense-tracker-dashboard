import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function BusinessTransactionForm({
    description, setDescription,
    amount, setAmount,
    type, setType,
    date, setDate,
    handleAddTransaction,
    editingTransaction, setEditingTransaction,
    formError
}) {
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

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">
                {editingTransaction ? "✏️ Edit Transaction" : "➕ Add New Transaction"}
            </h2>

            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="0.01" step="0.01" className="w-full p-2 border rounded" />

            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                {editingTransaction ? "Save Changes" : "Add Transaction"}
            </button>

            {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}
        </form>
    );
}
