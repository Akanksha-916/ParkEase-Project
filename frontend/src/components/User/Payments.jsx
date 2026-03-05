import React from "react";
import "./Payments.css";

const Payments = () => {
  const payments = [
    {
      id: 1,
      parkingSpot: "A1",
      date: "2026-03-01",
      amount: 200,
      status: "Paid",
    },
    {
      id: 2,
      parkingSpot: "B3",
      date: "2026-02-25",
      amount: 150,
      status: "Pending",
    },
    {
      id: 3,
      parkingSpot: "C5",
      date: "2026-02-20",
      amount: 300,
      status: "Paid",
    },
    {
      id: 4,
      parkingSpot: "D2",
      date: "2026-02-15",
      amount: 180,
      status: "Paid",
    },
    {
      id: 5,
      parkingSpot: "E4",
      date: "2026-02-10",
      amount: 220,
      status: "Pending",
    },
    {
      id: 6,
      parkingSpot: "F1",
      date: "2026-02-05",
      amount: 260,
      status: "Paid",
    },
    {
      id: 7,
      parkingSpot: "G7",
      date: "2026-01-28",
      amount: 190,
      status: "Paid",
    },
    {
      id: 8,
      parkingSpot: "H6",
      date: "2026-01-22",
      amount: 210,
      status: "Pending",
    },
  ];

  return (
    <div className="payments-container">
      <h2 className="payments-title">My Payments</h2>

      <div className="table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Parking Spot</th>
              <th>Date</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.parkingSpot}</td>
                <td>{payment.date}</td>
                <td>₹{payment.amount}</td>
                <td>
                  <span
                    className={
                      payment.status === "Paid"
                        ? "status paid"
                        : "status pending"
                    }
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Payments;