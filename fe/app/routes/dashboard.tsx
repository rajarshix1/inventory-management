import type { Route } from "./+types/dashboard";
import { useAuth } from "../../context/appContext";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - Inventory System" }];
}

export default function Dashboard() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !isAuthenticated) return;

    const fetchDashboardData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboardData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isClient, isAuthenticated]);

  // Redirect only on client side after checking auth
  if (isClient && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getTotalPurchaseOrders = () => {
    if (!dashboardData?.counts.purchaseOrders) return 0;
    return dashboardData.counts.purchaseOrders.reduce(
      (sum: number, po: any) => sum + (po.orders?.length || 0),
      0
    );
  };

  const getSalesOrdersCount = () => dashboardData?.counts.salesOrders.length || 0;

  const getAllPurchaseOrders = () => {
    if (!dashboardData?.counts.purchaseOrders) return [];
    const allOrders: any[] = [];
    dashboardData.counts.purchaseOrders.forEach((po: any) => {
      if (po.orders) {
        allOrders.push(...po.orders);
      }
    });
    return allOrders.slice(0, 5);
  };


  return (
    <div className="p-4">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Inventory System</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Logout
        </button>
      </nav>

      <main>
        <h2 className="text-lg font-medium mb-4">Dashboard</h2>

        {loading && <div className="text-gray-600">Loading...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {dashboardData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm text-gray-600 mb-1">Products</h3>
                <p className="text-2xl font-bold">{dashboardData.counts.products}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm text-gray-600 mb-1">Variants</h3>
                <p className="text-2xl font-bold">{dashboardData.counts.variants}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm text-gray-600 mb-1">Purchase Orders</h3>
                <p className="text-2xl font-bold">{getTotalPurchaseOrders()}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm text-gray-600 mb-1">Sales Orders</h3>
                <p className="text-2xl font-bold">{getSalesOrdersCount()}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium">Products</h3>
              </div>
              <div className="">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dashboardData.products.map((product: any) => (
                      <tr key={product._id}>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2 text-gray-600">{product.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium">Variants</h3>
              </div>
              <div className="">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">SKU</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Size</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Color</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Price</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dashboardData.variants.map((variant: any) => (
                      <tr key={variant._id}>
                        <td className="px-4 py-2">{variant.sku}</td>
                        <td className="px-4 py-2">{variant.size}</td>
                        <td className="px-4 py-2">{variant.color}</td>
                        <td className="px-4 py-2">Rs {variant.price}</td>
                        <td className={`px-4 py-2 ${variant.quantity < 5 ? "text-red-600 font-semibold" : ""}`}>
                          {variant.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium">Recent Purchase Orders</h3>
              </div>
              {getAllPurchaseOrders().length > 0 ? (
                <div className="">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Supplier</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Total Price</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {getAllPurchaseOrders().map((order: any) => (
                        <tr key={order._id}>
                          <td className="px-4 py-2">{order.supplier?.name || "N/A"}</td>
                          <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-4 py-2">{order.quantity}</td>
                          <td className="px-4 py-2">Rs {order.totalPrice}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.orderStatus === "Received" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 text-gray-500 text-sm">No purchase orders</div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium">Sales Orders</h3>
              </div>
              {dashboardData.counts.salesOrders.length > 0 ? (
                <div className="">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Quantity</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-600">Total Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dashboardData.counts.salesOrders.map((order: any) => (
                        <tr key={order._id}>
                          <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-4 py-2">{order.quantity}</td>
                          <td className="px-4 py-2">Rs {order.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 text-gray-500 text-sm">No sales orders</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
