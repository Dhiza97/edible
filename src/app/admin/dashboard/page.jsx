"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
                    setData(result);
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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Welcome, admin! Here are your latest updates:</p>
            
        </div>
    );
}
