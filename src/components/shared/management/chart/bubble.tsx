"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

export default function BubbleChart() {
    //Create a dataset
    const data = {
        datasets: [{
            label: 'First Dataset',
            data: [
                { x: 20, y: 30, r: 15 },
                { x: 40, y: 10, r: 10 },
            ],
            backgroundColor: 'rgb(255, 99, 132)'
        }]
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myBubbleChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'bubble',
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
            <canvas id="myBubbleChart"></canvas>
        </div>
    )
}
