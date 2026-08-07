import {
  IndianRupee,
  Boxes,
  ShoppingCart,
  Users,
  Wallet,
  TrendingUp,
} from "lucide-react";
import "../../css/StatsCards.home.css";
import { useState, useEffect } from "react";
import { getDashboard } from "../../api/dashboard.api";

function StatsCards() {
  const [Loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [Error, setError] = useState(null);

  const cards = [
    {
      title: "Today's Sales",
      value: "₹18,750",
      change: "12.5%",
      subtitle: "vs yesterday",
      icon: <IndianRupee size={28} />,
      color: "green",
      key: "todayRevenue",
    },
    {
      title: "Total Products",
      value: "512",
      change: "8.2%",
      subtitle: "vs last month",
      icon: <Boxes size={28} />,
      color: "blue",
      key: "totalProducts",
    },
    {
      title: "Monthly Sales (July)",
      value: "₹1,25,430",
      change: "15.7%",
      subtitle: "vs last month",
      icon: <ShoppingCart size={28} />,
      color: "purple",
      key: "monthlyRevenue",
    },
    {
      title: "Customers",
      value: "128",
      change: "5.3%",
      subtitle: "vs last month",
      icon: <Users size={28} />,
      color: "orange",
      key: "totalCustomers",
    },
    {
      title: "Pending Payments",
      value: "₹43,250",
      change: "18.6%",
      subtitle: "vs last month",
      icon: <Wallet size={28} />,
      color: "red",
      key: "pendingAmount",
    },
  ];

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  if (Loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <section className="home-stats">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`home-stat-card home-stat-${card.color}`}
        >
          <div className="home-stat-top">
            <div className={`home-stat-icon home-icon-${card.color}`}>
              {card.icon}
            </div>

            <div className="home-stat-info">
              <h4>{card.title}</h4>
              <h2>{dashboard[card.key]}</h2>
            </div>
          </div>

          <div className="home-stat-bottom">
            <div className="home-stat-growth">
              <div className="home-stat-change">
                <TrendingUp size={16} />
                <span>{card.change}</span>
              </div>

              <small>{card.subtitle}</small>
            </div>

            <div className="home-stat-chart">
              {/* Mini Graph baad me banayenge */}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;
