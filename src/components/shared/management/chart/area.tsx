"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

export default function AreaChart() {
    //Create a dataset
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        data: {
            datasets: [
                {fill: 'origin'},      // 0: fill to 'origin'
                {fill: '+2'},          // 1: fill to dataset 3
                {fill: 1},             // 2: fill to dataset 1
                {fill: false},         // 3: no fill
                {fill: '-2'},          // 4: fill to dataset 2
                {fill: {value: 25}}    // 5: fill to axis value 25
            ]
        }
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myAreaChart') as HTMLCanvasElement;
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
            <canvas id="myAreaChart"></canvas>
        </div>
    )
}

