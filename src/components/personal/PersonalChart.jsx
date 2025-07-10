import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const COLORS = ['#60a5fa', '#fbbf24', '#34d399'];

export default function PersonalChart({ categoryTotals }) {
    const { t } = useTranslation();
    const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
        name: t(name), // išversime kategorijų pavadinimus
        value
    }));
    const hasData = chartData.some(entry => entry.value > 0);

    const displayColors = hasData ? COLORS : ['#e5e7eb'];
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const renderLabel = ({ value }) => {
        if (!hasData || total === 0) return '';
        const percent = ((value / total) * 100).toFixed(0);
        return `${percent}%`;
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
                {t("expenseDistribution")}
            </h3>
            <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                    <Pie
                        data={hasData ? chartData : [{ name: t("noData"), value: 1 }]}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={hasData ? renderLabel : false}
                        labelStyle={{ fontSize: 12, fill: "#374151" }}
                    >
                        {(hasData ? chartData : [{ name: t("noData"), value: 1 }]).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={displayColors[index % displayColors.length]} />
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
                                style={{ backgroundColor: displayColors[index % displayColors.length] }}
                            ></div>
                            <span className="text-sm text-gray-700">
                                {entry.name}: €{entry.value.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-400">{t("noData")}</p>
            )}
        </div>
    );
}