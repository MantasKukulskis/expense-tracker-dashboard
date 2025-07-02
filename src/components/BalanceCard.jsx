export function BalanceCard({ income, expenses, balance }) {
    return (
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div className="bg-green-100 p-4 rounded">
                <h3 className="text-lg font-semibold">Income</h3>
                <p className="text-green-700 font-bold">€{income.toFixed(2)}</p>
            </div>
            <div className="bg-red-100 p-4 rounded">
                <h3 className="text-lg font-semibold">Expenses</h3>
                <p className="text-red-700 font-bold">€{expenses.toFixed(2)}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-semibold">Balance</h3>
                <p className="font-bold">€{balance.toFixed(2)}</p>
            </div>
        </div>
    );
}