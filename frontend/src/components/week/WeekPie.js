import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const WeeklyPie = ({ employeeId }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:8080/emp/gettasks';

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || data.length === 0) {
          throw new Error('No data found');
        }

        const employeeTasks = data.filter(task => task.employeeId === employeeId);

        const hoursPerWeek = employeeTasks.reduce((acc, task) => {
          const date = new Date(task.date);
          const startTime = new Date(`1970-01-01T${task.startTime}`);
          const endTime = new Date(`1970-01-01T${task.endTime}`);
          const adjustedDiffInMs = (endTime - startTime) >= 0 ? (endTime - startTime) : (endTime - startTime) + 24 * 60 * 60 * 1000;
          const duration = adjustedDiffInMs / (1000 * 60 * 60);

          const year = date.getFullYear();
          const week = Math.ceil(((date - new Date(year, 0, 1)) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7);
          const weekKey = `${year}-W${week}`;

          if (!acc[weekKey]) {
            acc[weekKey] = 0;
          }
          acc[weekKey] += duration;

          return acc;
        }, {});

        const labels = Object.keys(hoursPerWeek);
        const dataSet = Object.values(hoursPerWeek);

        const backgroundColors = [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)'
        ];

        const borderColors = [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)'
        ];

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Hours Worked Per Week',
              data: dataSet,
              backgroundColor: backgroundColors.slice(0, labels.length),
              borderColor: borderColors.slice(0, labels.length),
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-96 h-52'>
      <h1 className="text-center text-lg font-semibold mb-4">Employee Hours Worked (Weekly)</h1>
      <Pie data={chartData} />
    </div>
  );
};

export default WeeklyPie;
