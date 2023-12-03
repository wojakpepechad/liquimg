import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js'; // Import Chart and registerables

Chart.register(...registerables); // Register the necessary components

interface LiquidityPosition {
    id: number;
    liquidity: number;
}

interface ChartDataType {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }[];
}

const UserLiquidity: React.FC = () => {
    const [positions, setPositions] = useState<LiquidityPosition[]>([]);
    const [positionsTotal, setPositionsTotal] = useState<LiquidityPosition[]>([]);
    const [chartData, setChartData] = useState<ChartDataType | null>(null);

    useEffect(() => {
        const fetchPositions = async () => {
            const positions = [];

            for (let i = 1; i <= 30; i++) {
                // Generate a random number between 0 and 100 for liquidity
                const liquidity = Math.floor(Math.random() * 101);

                positions.push({ id: i, liquidity });
            }

            return positions;
        };

        const fetchPositionsTotal = async () => {
            const positionsTotal = [];

            for (let i = 1; i <= 30; i++) {
                // Generate a random number between 0 and 100 for liquidity
                const liquidity = Math.floor(Math.random() * 101);

                positionsTotal.push({ id: i, liquidity });
            }

            return positionsTotal;
        };

        Promise.all([fetchPositions(), fetchPositionsTotal()]).then(([userPositions, totalPositions]) => {
            setPositions(userPositions);
            setPositionsTotal(totalPositions);
            setChartData({
              labels: userPositions.map(pos => `Position ${pos.id}`),
              datasets: [
                {
                  label: 'User Liquidity',
                  data: userPositions.map(pos => pos.liquidity),
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Other Liquidity',
                  data: totalPositions.map(pos => pos.liquidity),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                }
              ],
            });
          });
        }, []);

    return (
        <div>
            <h2>User Liquidity</h2>
            {chartData && (
                <Bar
                    key={JSON.stringify(chartData)} // Unique key based on chart data
                    data={chartData}
                    options={{
                        scales: {
                            y: {
                                stacked: true, // Ensure y-axis is stacked
                                beginAtZero: true
                            },
                            x: {
                                stacked: true // Ensure x-axis is stacked
                            }
                        }
                    }}
                />

            )}
        </div>
    );

};

export default UserLiquidity;
