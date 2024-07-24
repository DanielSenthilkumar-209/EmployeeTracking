import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const WeeklyLine = ({ employeeId }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API URL
    const apiUrl = 'http://localhost:8080/emp/gettasks';
    // Replace with the actual employee ID

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || data.length === 0) {
          throw new Error('No data found');
        }

        // Filter tasks for the specific employee
        const employeeTasks = data.filter(task => task.employeeId === employeeId);

        // Process data to get total hours worked per week
        const hoursPerWeek = employeeTasks.reduce((acc, task) => {
          const date = new Date(task.date);
          const startTime = new Date(`1970-01-01T${task.startTime}`);
          const endTime = new Date(`1970-01-01T${task.endTime}`);
          const adjustedDiffInMs = (endTime - startTime) >= 0 ? (endTime - startTime) : (endTime - startTime) + 24 * 60 * 60 * 1000;
          const duration = adjustedDiffInMs / (1000 * 60 * 60); // Convert milliseconds to hours

          // Get the week number from the date
          const year = date.getFullYear();
          const week = Math.ceil(((date - new Date(year, 0, 1)) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7);

          const weekKey = `${year}-W${week}`;

          if (!acc[weekKey]) {
            acc[weekKey] = 0;
          }
          acc[weekKey] += duration;

          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(hoursPerWeek);
        const dataSet = Object.values(hoursPerWeek);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Hours Worked Per Week',
              data: dataSet,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
    <div>
      <h1>Employee Hours Worked (Weekly)</h1>
      <Line data={chartData} />
    </div>
  );
};

export default WeeklyLine;
