import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as chartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

chartJs.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
);

const NewChart = ({ arr = [], currency, days }) => {

  const prices = [];
  const date = [];

  for (let i = 1; i < arr.length; i++) {
    if (days === "24hr") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else{

      date.push(new Date(arr[i][0]).toLocaleDateString());

    }
   
    prices.push(arr[i][1]);

  }

  const data = {
    labels: date,
    datasets: [{
      label: `price in ${currency}`,
      data: prices, borderColor: "rgb(225,99,132)",
      backgroundColor: "rgba(225, 99, 132, 0.5)",

    },
    ],
  }
  return (
    <Line options={{
      responsive: true,

    }}

      data={data}


    />

  )
}

export default NewChart;
