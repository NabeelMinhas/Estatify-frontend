import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './PriceChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  currentPrice: number;
  propertyTitle: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ currentPrice }) => {
  // Generate mock historical price data (in a real app, this would come from an API)
  const generatePriceHistory = (basePrice: number) => {
    const months = [
      'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
      'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023'
    ];
    
    const prices = [];
    let price = basePrice * 0.85; // Start 15% below current price
    
    for (let i = 0; i < months.length; i++) {
      // Simulate price growth with some fluctuation
      const growth = 0.01 + Math.random() * 0.02; // 1-3% monthly growth
      const fluctuation = (Math.random() - 0.5) * 0.1; // ±5% fluctuation
      price = price * (1 + growth + fluctuation);
      prices.push(Math.round(price));
    }
    
    // Ensure the last price is close to the current price
    prices[prices.length - 1] = currentPrice;
    
    return { months, prices };
  };

  const { months, prices } = generatePriceHistory(currentPrice);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Property Value',
        data: prices,
        borderColor: 'rgb(102, 126, 234)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(102, 126, 234)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgb(118, 75, 162)',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Price History (12 Months)',
        color: '#1e293b',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgb(102, 126, 234)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'rgb(118, 75, 162)',
      },
    },
  };

  // Calculate price change
  const priceChange = currentPrice - prices[0];
  const priceChangePercent = ((priceChange / prices[0]) * 100).toFixed(1);
  const isPositive = priceChange >= 0;

  return (
    <div className="price-chart">
      <div className="price-chart__header">
        <div className="price-chart__stats">
          <div className="price-chart__current-price">
            Current Value: <span>${currentPrice.toLocaleString()}</span>
          </div>
          <div className={`price-chart__change ${isPositive ? 'price-chart__change--positive' : 'price-chart__change--negative'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isPositive ? (
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              ) : (
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
              )}
            </svg>
            {isPositive ? '+' : ''}{priceChangePercent}% (12 months)
          </div>
        </div>
      </div>
      <div className="price-chart__container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PriceChart;
