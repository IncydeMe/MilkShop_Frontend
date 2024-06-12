"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import { cn } from '@/lib/utils';

interface LineChartProps {
    datasets : {
        label: string,
        data: number[],
        fill: boolean,
        borderColor: string,
        tension: number
    }[],
    labels: string[],
    className?: string
}

const LineChart: React.FC<LineChartProps> = ({
    datasets,
    labels,
    className
}) => {
    //Create a dataset
    const data = {
        labels: labels,
        datasets: datasets
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myLineChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
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
                                beginAtZero: true,
                                maxTicksLimit: 5
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
        <div className={cn('relative', className)}>
            <canvas id="myLineChart"></canvas>
        </div>
    )
}

export default LineChart;
