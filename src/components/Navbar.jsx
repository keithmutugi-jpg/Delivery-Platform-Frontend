import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-6 bg-white rounded-xl shadow p-4">
      <div>
        <h1 className="text-xl font-bold text-orange-600">Delivery Platform</h1>
        {user && <p className="text-sm text-gray-500">Hi, {user.username}</p>}
      </div>
      <div className="flex gap-4 items-center">
        <button onClick={() => navigate("/products")} className="text-orange-600 font-medium text-sm">
          Products
        </button>
        <button onClick={() => navigate("/orders")} className="text-orange-600 font-medium text-sm">
          My Orders
        </button>
        <button onClick={handleLogout} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200">
          Logout
        </button>
      </div>
    </div>
  );
}
