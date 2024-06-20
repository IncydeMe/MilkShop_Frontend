"use client";

import React, { useEffect } from "react";
import { Chart } from "chart.js";
import { cn } from "@/lib/utils";

interface BarChartProps {
  datasets: {
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    barPercentage: number;
  }[];
  labels: string[];
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ datasets, labels, className }) => {
  const data = {
    labels: labels,
    datasets: datasets
  }
  
  //Create a chart
  useEffect(() => {
    const ctx = document.getElementById("myBarChart") as HTMLCanvasElement;
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 4,
              },
              scaleLabel: {
                display: true,
                labelString: "Total",
              },
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    });
  }, []);

  //Return the chart
  return (
    <div className={cn("relative", className)}>
      <canvas id="myBarChart"></canvas>
    </div>
  );
};

export default BarChart;
