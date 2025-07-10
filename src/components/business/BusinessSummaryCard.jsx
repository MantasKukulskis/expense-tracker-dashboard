export default function BusinessSummaryCard({ income, expenses, balance }) {
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md flex justify-between space-x-6 mt-8">
            <div className="flex flex-col items-center flex-1 bg-green-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-700 mb-2">Income</h4>
                <p className="text-2xl font-bold text-green-800">${income.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center flex-1 bg-red-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-red-700 mb-2">Expenses</h4>
                <p className="text-2xl font-bold text-red-800">${Math.abs(expenses).toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center flex-1 bg-blue-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Balance</h4>
                <p className={`text-2xl font-bold ${balance < 0 ? 'text-red-600' : 'text-blue-800'}`}>
                    ${balance.toFixed(2)}
                </p>
            </div>
        </div>
    );
}