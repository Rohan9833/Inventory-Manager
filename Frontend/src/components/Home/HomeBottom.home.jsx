import "../../css/HomeBottom.home.css"

function HomeBottom() {
  const recentSales = [
    {
      customer: "Rahul Sharma",
      invoice: "#INV-1025",
      amount: "₹2,450",
      status: "Paid",
    },
    {
      customer: "Priya Singh",
      invoice: "#INV-1024",
      amount: "₹5,800",
      status: "Pending",
    },
    {
      customer: "Amit Verma",
      invoice: "#INV-1023",
      amount: "₹1,950",
      status: "Paid",
    },
  ];

  const paymentDue = [
    {
      customer: "Neha Gupta",
      invoice: "#INV-1019",
      amount: "₹8,400",
      status: "Overdue",
    },
    {
      customer: "Rohit Patel",
      invoice: "#INV-1018",
      amount: "₹3,250",
      status: "Due",
    },
    {
      customer: "Anjali Shah",
      invoice: "#INV-1017",
      amount: "₹6,120",
      status: "Due",
    },
  ];

  return (
    <section className="home-bottom-wrapper">
      {/* Recent Sales */}

      <div className="home-bottom-card">
        <div className="home-bottom-header">
          <h3>Recent Sales</h3>
          <button>View All</button>
        </div>

        <div className="home-bottom-list">
          {recentSales.map((sale, index) => (
            <div className="home-bottom-item" key={index}>
              <div className="home-bottom-avatar">
                {sale.customer
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div className="home-bottom-info">
                <h4>{sale.customer}</h4>
                <p>{sale.invoice}</p>
              </div>

              <div className="home-bottom-right">
                <h4>{sale.amount}</h4>

                <span
                  className={
                    sale.status === "Paid"
                      ? "home-badge-paid"
                      : "home-badge-pending"
                  }
                >
                  {sale.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Due */}

      <div className="home-bottom-card">
        <div className="home-bottom-header">
          <h3>Payment Due</h3>
          <button>View All</button>
        </div>

        <div className="home-bottom-list">
          {paymentDue.map((payment, index) => (
            <div className="home-bottom-item" key={index}>
              <div className="home-bottom-avatar">
                {payment.customer
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div className="home-bottom-info">
                <h4>{payment.customer}</h4>
                <p>{payment.invoice}</p>
              </div>

              <div className="home-bottom-right">
                <h4>{payment.amount}</h4>

                <span
                  className={
                    payment.status === "Overdue"
                      ? "home-badge-overdue"
                      : "home-badge-due"
                  }
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeBottom;