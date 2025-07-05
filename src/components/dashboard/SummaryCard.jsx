export default function SummaryCard({ income, expenses, balance }) {
    return (
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
    );
}