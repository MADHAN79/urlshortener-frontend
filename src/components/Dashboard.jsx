import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [dailyCounts, setDailyCounts] = useState({});
  const [monthlyCounts, setMonthlyCounts] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const [dailyRes, monthlyRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/url/stats/daily`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/url/stats/monthly`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDailyCounts(dailyRes.data);
        setMonthlyCounts(monthlyRes.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const dailyData = {
    labels: Object.keys(dailyCounts),
    datasets: [
      {
        label: 'URLs Created',
        data: Object.values(dailyCounts),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const monthlyData = {
    labels: Object.keys(monthlyCounts),
    datasets: [
      {
        label: 'URLs Created',
        data: Object.values(monthlyCounts),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl mb-4">Daily URL Creations</h3>
        <Bar data={dailyData} />
      </div>
      <div>
        <h3 className="text-xl mb-4">Monthly URL Creations</h3>
        <Bar data={monthlyData} />
      </div>
    </div>
  );
};

export default Dashboard;
