"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

export default function DoughnutChart() {
    //Create a dataset
    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myDoughnutChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Chart.js Doughnut Chart'
                  }
                }
              },
        });
    }, []);
    //Return the chart
    return (
        <div>
            <canvas id="myDoughnutChart"></canvas>
        </div>
    )
}