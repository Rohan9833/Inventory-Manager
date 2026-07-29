import { useState,useEffect } from "react";
import StatCard from "../components/StatCard.dashboard";
import { getDashboard } from "../api/dashboard.api";

function Dashboard() {
  const dashboardCards = [
    {
      title: "Total Products",
      key: "totalProducts",
    },
    {
      title: "Total Customers",
      key: "totalCustomers",
    },
    {
      title: "Today's Revenue",
      key: "todayRevenue",
    },
    {
      title: "Monthly Revenue",
      key: "monthlyRevenue",
    },
    {
      title: "Pending Amount",
      key: "pendingAmount",
    },
    {
      title: "Low Stock Products",
      key: "lowStockProducts",
    },
    {
      title: "Today's Orders",
      key: "todayOrders",
    },
  ];
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const data = await getDashboard();
      console.log(data);
      setDashboard(data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {dashboardCards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={dashboard[card.key]}
        />
      ))}
    </>
  );
}

export default Dashboard;
