export default function TransactionList({ transactions }) {
    return (
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
    );
}