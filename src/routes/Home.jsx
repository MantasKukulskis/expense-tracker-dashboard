import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center">
                    <img
                        src="./src/assets/business.png"
                        alt="Business"
                        className="w-40 h-40 object-contain mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Business Tracker</h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Track your business income, expenses and budget in one place.
                    </p>
                    <button
                        onClick={() => navigate('/business')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                    >
                        Go to Business
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center">
                    <img
                        src="./src/assets/personal.png"
                        alt="Personal"
                        className="w-40 h-40 object-contain mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">Personal Tracker</h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Stay on top of your daily spending and personal budget.
                    </p>
                    <button
                        onClick={() => navigate('/personal')}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                    >
                        Go to Personal
                    </button>
                </div>
            </div>
        </div>
    );
}