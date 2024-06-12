"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';
import { cn } from '@/lib/utils';

interface PieChartProps {
    datasets : {
        label: string,
        data: number[],
        backgroundColor: string[],
        borderColor: string[],
        borderWidth: number
    }[],
    labels: string[],
    className?: string
}

const PieChart: React.FC<PieChartProps> = ({
    datasets,
    labels,
    className
}) =>  {
    //Create a dataset
    const data = {
        labels: labels,
        datasets: datasets
    }

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  title: {
                    display: true,
                    text: 'Category distribution'
                  },
                }
              },
        });
    }, []);
    //Return the chart
    return (
        <div className={cn('relative', className)}>
            <canvas id="myPieChart"></canvas>
        </div>
    )
}
export default PieChart;
