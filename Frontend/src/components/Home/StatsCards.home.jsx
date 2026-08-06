import {
  IndianRupee,
  Boxes,
  ShoppingCart,
  Users,
  Wallet,
  TrendingUp,
} from "lucide-react";
import "../../css/StatsCards.home.css"

function StatsCards() {
  const cards = [
    {
      title: "Today's Sales",
      value: "₹18,750",
      change: "12.5%",
      subtitle: "vs yesterday",
      icon: <IndianRupee size={28} />,
      color: "green",
    },
    {
      title: "Total Products",
      value: "512",
      change: "8.2%",
      subtitle: "vs last month",
      icon: <Boxes size={28} />,
      color: "blue",
    },
    {
      title: "Total Sales (July)",
      value: "₹1,25,430",
      change: "15.7%",
      subtitle: "vs last month",
      icon: <ShoppingCart size={28} />,
      color: "purple",
    },
    {
      title: "Customers",
      value: "128",
      change: "5.3%",
      subtitle: "vs last month",
      icon: <Users size={28} />,
      color: "orange",
    },
    {
      title: "Pending Payments",
      value: "₹43,250",
      change: "18.6%",
      subtitle: "vs last month",
      icon: <Wallet size={28} />,
      color: "red",
    },
  ];

  return (
    <section className="home-stats">
      {cards.map((card, index) => (
        <div key={index} className={`home-stat-card home-stat-${card.color}`}>
          <div className="home-stat-top">
            <div className={`home-stat-icon home-icon-${card.color}`}>
              {card.icon}
            </div>

            <div className="home-stat-info">
              <h4>{card.title}</h4>
              <h2>{card.value}</h2>
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
