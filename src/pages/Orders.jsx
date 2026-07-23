import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  preparing: "bg-blue-100 text-blue-700",
  ready: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/orders/")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-600">My Orders</h1>
          <button
            onClick={() => navigate("/products")}
            className="text-orange-600 font-medium"
          >
            ← Browse Products
          </button>
        </div>

        {orders.length === 0 && <p>No orders yet.</p>}

        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{o.product_name}</p>
                  <p className="text-gray-500 text-sm">
                    Qty: {o.quantity} · KES {o.total_price}
                  </p>
                  <p className="text-gray-500 text-sm">{o.delivery_address}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    statusColors[o.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              {o.payment && (
                <p className="text-xs text-gray-400 mt-2">
                  Payment: {o.payment.method} ({o.payment.status})
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
