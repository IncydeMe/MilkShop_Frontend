"use client";

import React from "react";
import { BarChart3, BarChartBig } from "lucide-react";
import Chart from 'chart.js';

function AdminIndexPage() {
  React.useEffect(() => {
    let canvasElement = document.getElementById("bar-chart") as HTMLCanvasElement;
    let ctx = canvasElement.getContext("2d");
    
    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4a5568",
            borderColor: "#4a5568",
            data: [30, 78, 56, 34, 100, 45, 13, 89, 49, 12, 98, 86],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#DB2777",
            borderColor: "#DB2777",
            data: [27, 68, 86, 74, 10, 4, 87, 90, 99, 64, 9, 12],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    
    window.myBar = new Chart(ctx, config);
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <section className="flex gap-10 items-center justify-center w-1/2 mr-4 py-10 bg-pink-50 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="px-4 pt-5">
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                599+ / Month
              </span>
            </div>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Tỉ lệ đăng ký trung bình / tháng
            </h5>
          </div>
          <BarChartBig size={100} />
        </section>
        <section className="flex gap-10 items-center justify-center w-1/2 ml-4 bg-pink-50 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="px-4 pt-5">
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                999+ / Month
              </span>
            </div>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Tỉ lệ truy cập trung bình / tháng
            </h5>
          </div>
          <BarChart3 size={100} />
        </section>
      </div>
      <div className="flex flex-col w-full my-6 py-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Bảng thống kê
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Tỉ lệ các tài khoản hoạt động / tháng
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 w-[1200px] h-[500px]">
            <canvas id="bar-chart"></canvas>
        </div>
      </div>
    </>
  );
}

export default AdminIndexPage;
