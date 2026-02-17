const DashboardCard = ({ title, value, icon, color }) => {
    return (
        <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-500 text-sm uppercase font-bold">{title}</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
                </div>
                <div className={`text-4xl opacity-80 ${color.replace('border-', 'text-')}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;