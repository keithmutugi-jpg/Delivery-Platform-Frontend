import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/products/")
      .then((res) => setProducts(res.data))
      .catch(() => setMessage("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const placeOrder = async (product) => {
    try {
      await api.post("/orders/", {
        business: product.business,
        product: product.id,
        quantity: 1,
        delivery_address: "Nairobi CBD",
        payment_method: "cash",
      });
      setMessage(`Order placed for ${product.name}!`);
    } catch {
      setMessage("Failed to place order");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-600">Browse Products</h1>
          <button
            onClick={() => navigate("/orders")}
            className="text-orange-600 font-medium"
          >
            My Orders
          </button>
        </div>

        {message && (
          <p className="bg-green-100 text-green-700 text-sm p-2 rounded mb-4">
            {message}
          </p>
        )}

        {products.length === 0 && <p>No products available yet.</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-gray-500 text-sm">{p.business_name}</p>
              <p className="text-gray-600 mt-1">{p.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-orange-600">KES {p.price}</span>
                <button
                  onClick={() => placeOrder(p)}
                  className="bg-orange-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-700"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
