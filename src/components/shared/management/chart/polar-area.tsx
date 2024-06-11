"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';


export default function PolarAreaChart() {
    //Create a dataset
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
            label: 'My First Dataset',
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)'
            ]
        }]
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myPolarAreaChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'polarArea',
            data: data,
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });
    }, []);
    return (
        <div>
            <canvas id="myPolarAreaChart"></canvas>
        </div>
    )
}
