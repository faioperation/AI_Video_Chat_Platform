"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Series A",
        data: [5, 40, 62, 68, 65, 60, 75, 78, 85, 75, 55, 120],
        borderColor: "#AED3CA",
        backgroundColor: "#FFFFFF",
        tension: 0.1,
        pointRadius: 6,
      },
      {
        label: "Series B",
        data: [0, 35, 30, 57, 50, 38, 80, 77, 70, 60, 45, 110],
        borderColor: "#A2A9B0",
        backgroundColor: "#DCCEAC",
        tension: 0.1,
        pointRadius: 6,
        pointBorderColor: "#A2A9B0"
        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend if you want a clean look like in your image
      },
    },
    scales: {
      y: {
        beginAtZero: true,
         border: { display: false },
        ticks: {
          stepSize: 10,
        },
        grid: {
          display: false,
          
        },
      },
      x: {
         border: { display: false },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-[#F3F2F2] rounded-lg h- ">
      <Line data={data} options={options} />
    </div>
  );
}
