"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBox, FaUsers, FaCheckCircle } from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          localStorage.removeItem("adminToken");
          router.push("/admin/login");
        } else {
          setData(result.data);
        }
      } catch (error) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6">Welcome, admin! Here are your latest updates:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaBox className="text-3xl text-primaryColor mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-gray-600">{data?.productsCount || 0} Products</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaUsers className="text-3xl text-primaryColor mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-600">{data?.usersCount || 0} Users</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <FaCheckCircle className="text-3xl text-primaryColor mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Completed Orders</h2>
            <p className="text-gray-600">
              {data?.completedOrdersCount || 0} Completed Orders
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 font-semibold">Order ID</th>
              <th className="border p-2 font-semibold">Customer</th>
              <th className="border p-2 font-semibold">Date</th>
              <th className="border p-2 font-semibold">Total</th>
              <th className="border p-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentOrders?.length > 0 ? (
              data.recentOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.user.name}</td>
                  <td className="border p-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">${order.totalAmount}</td>
                  <td className="border p-2">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No recent orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
