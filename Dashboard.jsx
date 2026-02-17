import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import DashboardCard from '../components/DashboardCard';
import { FaDollarSign, FaBoxOpen, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // Mock Data
    const stats = [
        { title: "Total Revenue", value: "$12,340", icon: <FaDollarSign />, color: "border-green-500" },
        { title: "Total Products", value: "145", icon: <FaBoxOpen />, color: "border-blue-500" },
        { title: "Low Stock Items", value: "3", icon: <FaExclamationTriangle />, color: "border-red-500" },
        { title: "Avg Daily Sales", value: "24", icon: <FaChartLine />, color: "border-purple-500" },
    ];

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Sales Revenue',
                data: [1200, 1900, 3000, 2500, 2000, 3500, 4200],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Weekly Sales Trend' },
        },
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <DashboardCard key={index} {...stat} />
                ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <Line options={options} data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
