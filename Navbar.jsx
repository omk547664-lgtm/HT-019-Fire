import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    return (
        <header className="bg-white shadow h-16 flex justify-between items-center px-6">
            <div className="text-gray-500 text-sm">Welcome back, Admin</div>
            <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-700">Admin User</span>
                <FaUserCircle className="text-3xl text-gray-400" />
            </div>
        </header>
    );
};

export default Navbar;