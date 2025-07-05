import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#34d399', '#f87171']; // Žalia - pajamos, Raudona - išlaidos

export default function Chart({ income, expenses }) {
    const chartData = [
        { name: 'Income', value: income },
        { name: 'Expenses', value: Math.abs(expenses) }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
                Diagram
            </h3>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}