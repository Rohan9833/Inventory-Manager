import { Plus, Box, UserPlus, Wallet } from "lucide-react";
import "../../css/QuickActions.home.css"

function QuickActions() {
  const actions = [
    {
      title: "New Sale",
      icon: <Plus size={30} />,
      color: "blue",
    },
    {
      title: "Add Product",
      icon: <Box size={30} />,
      color: "green",
    },
    {
      title: "Add Customer",
      icon: <UserPlus size={30} />,
      color: "orange",
    },
    {
      title: "Receive Payment",
      icon: <Wallet size={30} />,
      color: "purple",
    },
  ];

  return (
    <section className="home-actions">
      <h3 className="home-actions-title">Quick Actions</h3>

      <div className="home-actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`home-action-card home-action-${action.color}`}
          >
            <div className="home-action-icon">{action.icon}</div>

            <p>{action.title}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
