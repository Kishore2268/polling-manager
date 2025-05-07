// Import necessary libraries
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  // State to manage chart data, loading status, and error message
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vote results from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://polling-manager.onrender.com/results'); 
        setData(response.data); 
        setError(null); 
      } catch (err) {
        setError('Failed to fetch vote results');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="flex items-center justify-center h-64">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  // Display error message if fetching fails
  if (error) {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Votes',
        data: [data.yes_count, data.no_count],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Total Votes Distribution',
        font: {
          size: 18,
          family: "'Inter', sans-serif",
          weight: '600',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      // Tooltip customization
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = data.yes_count + data.no_count; // Calculate total votes
            const percentage = ((context.raw / total) * 100).toFixed(1); // Calculate percentage
            return `${context.raw} votes (${percentage}%)`;
          }
        }
      }
    },
    // Customize the appearance of the chart
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  // Render the bar chart
  return (
    <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
      <div className="px-6 py-8">
        <div className="h-[400px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
