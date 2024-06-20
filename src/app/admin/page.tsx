"use client";

import React from "react";
import { BarChart3, BarChartBig } from "lucide-react";
import Chart from "chart.js";
import BarChart from "@/components/shared/management/chart/bar";

function AdminIndexPage() {
  const registerRateDatasets = {
    labels:[
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
        data: [30, 78, 56, 34, 100, 45, 13, 89, 49, 12, 98, 86],
        fill: false,
        backgroundColor: "#DB2777",
        borderColor: "#DB2777",
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

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
      <section className="border-b-[2px] border-gray-500/15 shadow-lg w-full rounded-[8px]">
        {/* Line chart for showcasing profit in the month */}
        <h3 className="text-3xl my-2 mx-4 font-bold">Tỉ lệ các tài khoản hoạt động / tháng</h3>
        <BarChart
          datasets={registerRateDatasets.datasets}
          labels={registerRateDatasets.labels}
          className="mt-4 p-2 mx-auto w-3/4"
        />
      </section>
    </>
  );
}

export default AdminIndexPage;
