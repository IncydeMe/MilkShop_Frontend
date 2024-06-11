"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

export default function ScatterChart() {
    //Create a dataset
    const data = {
        datasets: [{
            label: 'Scatter Dataset',
            data: [
                { x: 1, y: -1 },
                { x: 2, y: 1 },
                { x: 3, y: 0 },
                { x: 4, y: 2 },
                { x: 5, y: 3 },
                { x: 6, y: 4 },
                { x: 7, y: 3 },
                { x: 8, y: 4 },
                { x: 9, y: 5 },
                { x: 10, y: 6 },
                { x: 11, y: 5 },
                { x: 12, y: 7 },
                { x: 13, y: 8 },
                { x: 14, y: 9 },
                { x: 15, y: 8 },
                { x: 16, y: 9 },
                { x: 17, y: 10 },
                { x: 18, y: 11 },
                { x: 19, y: 10 },
                { x: 20, y: 12 },
                { x: 21, y: 13 },
                { x: 22, y: 14 },
                { x: 23, y: 13 },
                { x: 24, y: 14 },
                { x: 25, y: 15 },
                { x: 26, y: 16 },
                { x: 27, y: 17 },
                { x: 28, y: 16 },
                { x: 29, y: 17 },
                { x: 30, y: 18 },
                { x: 31, y: 19 },
                { x: 32, y: 20 },
                { x: 33, y: 21 },
                { x: 34, y: 20 },
                { x: 35, y: 22 },
                { x: 36, y: 23 },
                { x: 37, y: 24 },
                { x: 38, y: 23 },
                { x: 39, y: 24 },
                { x: 40, y: 25 },
                { x: 41, y: 26 },
                { x: 42, y: 27 },
                { x: 43, y: 26 },
                { x: 44, y: 27 },
                { x: 45, y: 28 },
                { x: 46, y: 29 },
                { x: 47, y: 30 },
                { x: 48, y: 31 },
                { x: 49, y: 30 },
                { x: 50, y: 32 },
            ],
            backgroundColor: 'rgb(255, 99, 132)'
        }]
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myScatterChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }, []);

    //Return the chart
    return (
        <div>
            <canvas id="myScatterChart"></canvas>
        </div>
    )
}