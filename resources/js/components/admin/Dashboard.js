import React, {useState, useEffect} from "react";
import SmallCard from "../../UI/small-card";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const auth_token = localStorage.getItem("auth_token");


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

async function getTransactions() {
  const res = await fetch('api/transactions', {
      headers: {
          'Authorization': `Bearer ${auth_token}`
      }
  });

  const data = await res.json();
  if (!res.ok) {
      throw new Error(data.message || "Something wnt wrong");
  }

  return data.data;
}

async function getTotals() {
  const res = await fetch('api/totals', {
      headers: {
          'Authorization': `Bearer ${auth_token}`
      }
  });

  const data = await res.json();
  if (!res.ok) {
      throw new Error(data.message || "Something wnt wrong");
  }
  console.log("TOTALS: ", data.data);
  return data.data;
}

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState([]);
  
  useEffect(()=> {
    getTransactions().then((data)=> {
        setTransactions(data);
    });

    getTotals().then((data)=> {
      setTotals(data);
    });
}, []);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Buy and Sell of Rice 2022',
    },
  },
};

const labels = transactions.map((trans) => trans.created_at);

const data = {
  labels,
  datasets: [
    {
      label: 'Transactions',
      data: transactions.map((trans) => trans.amount),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row">
                <div className="col-md-4">
                    <SmallCard
                        color={"primary"}
                        title={"No. of Clients"}
                        subtitle={"Active"}
                        value={totals.clients}
                    />
                </div>
                <div className="col-md-4">
                    <SmallCard
                        color={"success"}
                        title={"No. of Farmers"}
                        subtitle={"Active"}
                        value={totals.farmers}
                    />
                </div>
                <div className="col-md-4">
                    <SmallCard
                        color={"warning"}
                        title={"No. of Trans."}
                        subtitle={"Active"}
                        value={totals.transactions}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Line options={options} data={data} />;
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
