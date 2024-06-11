"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

export default function LineChart() {
    //Create a dataset
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myLineChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            },
                            gridLines: {
                                drawOnChartArea: false,
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                drawOnChartArea: false
                            }
                        }
                    
                    ]
                }
            }
        });
    }, []);

    //Return the chart
    return (
        <div>
            <canvas id="myLineChart"></canvas>
        </div>
    )
}
