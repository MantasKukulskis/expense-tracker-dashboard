import { useTranslation } from 'react-i18next';

export default function PersonalSummaryCard({ food, fuel, entertainment }) {
    const { t } = useTranslation();

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md grid grid-cols-3 gap-4 mt-8">
            <div className="flex flex-col items-center bg-yellow-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-yellow-700 mb-2">{t("food")}</h4>
                <p className="text-2xl font-bold">${(food ?? 0).toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center bg-purple-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-purple-700 mb-2">{t("fuel")}</h4>
                <p className="text-2xl font-bold text-purple-800">${(fuel ?? 0).toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center bg-pink-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-pink-700 mb-2">{t("entertainment")}</h4>
                <p className="text-2xl font-bold text-pink-800">${(entertainment ?? 0).toFixed(2)}</p>
            </div>
        </div>
    );
}