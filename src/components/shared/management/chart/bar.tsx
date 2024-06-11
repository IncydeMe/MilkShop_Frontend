"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

//This will be example of how to use Bar Chart
export default function BarChart(){
    //Create a dataset
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Doanh thu',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            barPercentage: 0.5
        }]
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'bar',
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
                            scaleLabel: {
                                display: true,
                                labelString: 'Revenue'
                            },
                            gridLines: {
                                drawOnChartArea: false,
                            }
                        }
                    
                    ],
                      
              }
            }
        });
    }, []);

    //Return the chart
    return (
        <div>
            <canvas id="myBarChart" height={"24vh"} width={"60vw"}></canvas>
        </div>
    )
}

