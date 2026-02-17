import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaBox, FaMoneyBillWave, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "bg-blue-600" : "hover:bg-gray-700";

    return (
        <div className="bg-gray-800 text-white w-64 flex flex-col">
            <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
                Smart Inventory
            </div>
            <nav className="flex-1 py-6 px-4 space-y-2">
                <Link to="/" className={`flex items-center space-x-3 px-4 py-3 rounded transition ${isActive('/')}`}>
                    <FaChartLine /> <span>Dashboard</span>
                </Link>
                <Link to="/inventory" className={`flex items-center space-x-3 px-4 py-3 rounded transition ${isActive('/inventory')}`}>
                    <FaBox /> <span>Inventory</span>
                </Link>
                <Link to="/sales" className={`flex items-center space-x-3 px-4 py-3 rounded transition ${isActive('/sales')}`}>
                    <FaMoneyBillWave /> <span>Sales & Predict</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button className="flex items-center space-x-3 px-4 py-3 w-full rounded hover:bg-red-600 transition text-left" onClick={() => window.location.href = '/login'}>
                    <FaSignOutAlt /> <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
