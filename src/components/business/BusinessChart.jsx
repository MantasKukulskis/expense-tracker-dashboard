import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#34d399', '#f87171'];

export default function BusinessChart({ income = 0, expenses = 0 }) {
    const hasData = income !== 0 || expenses !== 0;

    const chartData = hasData
        ? [
            { name: 'Income', value: income },
            { name: 'Expenses', value: Math.abs(expenses) }
        ]
        : [{ name: 'Empty', value: 1 }];

    const displayColors = hasData ? COLORS : ['#e5e7eb'];
    const total = income + Math.abs(expenses);

    const renderLabel = ({ name, value }) => {
        if (!hasData || total === 0) return '';
        const percent = ((value / total) * 100).toFixed(0);
        return `${percent}%`;
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
                Monthly Distribution
            </h3>
            <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={hasData ? renderLabel : false}
                        labelStyle={{ fontSize: 12, fill: "#374151" }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={displayColors[index] || '#ccc'} />
                        ))}
                    </Pie>
                    {hasData && (
                        <Tooltip formatter={(value, name) => [`€${value.toFixed(2)}`, name]} />
                    )}
                </PieChart>
            </ResponsiveContainer>

            {hasData ? (
                <div className="w-full flex flex-col items-start gap-1">
                    {chartData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: displayColors[index] }}
                            ></div>
                            <span className="text-sm text-gray-700">
                                {entry.name}: €{entry.value.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-400">No data available</p>
            )}
        </div>
    );
}