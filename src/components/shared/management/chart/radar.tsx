"use client";

import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

export default function RadarChart() {
    //Create a dataset
    const data = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: 'My Second Dataset',
            data: [28, 48, 40, 19, 96, 27, 100],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    //Create a chart
    useEffect(() => {
        const ctx = document.getElementById('myRadarChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'radar',
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
            <canvas id="myRadarChart"></canvas>
        </div>
    )
}

