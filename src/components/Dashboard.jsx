export function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Expense Tracker Dashboard</h1>
                <p className="text-gray-600 mt-1">Track your expenses easily and clearly</p>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
                    <p className="text-3xl font-bold">$0.00</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Monthly Budget</h2>
                    <p className="text-3xl font-bold">$0.00</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Remaining Balance</h2>
                    <p className="text-3xl font-bold">$0.00</p>
                </div>
            </main>
        </div>
    );
}