import React from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Transactions',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
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
                        value={20}
                    />
                </div>
                <div className="col-md-4">
                    <SmallCard
                        color={"success"}
                        title={"No. of Farmers"}
                        subtitle={"Active"}
                        value={50}
                    />
                </div>
                <div className="col-md-4">
                    <SmallCard
                        color={"warning"}
                        title={"No. of Trans."}
                        subtitle={"Active"}
                        value={20}
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
