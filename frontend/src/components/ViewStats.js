import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { MdFullscreen, MdClose } from 'react-icons/md';
import DailyBar from './daily/DailyBar';
import DailyLine from './daily/DailyLine';
import DailyPie from './daily/DailyPie';
import WeeklyBar from './week/WeekBar';
import WeeklyLine from './week/WeekLine';
import WeeklyPie from './week/WeekPie';
import MonthlyBar from './month/MonthBar';
import MonthlyLine from './month/MonthLine';
import MonthlyPie from './month/MonthPie';
import { FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

const ViewStats = ({ id }) => {
  const [bdaily, setBdaily] = useState(true);
  const [ldaily, setLdaily] = useState(false);
  const [pdaily, setPdaily] = useState(false);
  const [bweekly, setBweekly] = useState(true);
  const [lweekly, setLweekly] = useState(false);
  const [pweekly, setPweekly] = useState(false);
  const [bmonthly, setBmonthly] = useState(true);
  const [lmonthly, setLmonthly] = useState(false);
  const [pmonthly, setPmonthly] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullscreenChart, setFullscreenChart] = useState(null);

  const handleDailyb = () => {
    setBdaily(true);
    setLdaily(false);
    setPdaily(false);
  };
  const handleDailyl = () => {
    setBdaily(false);
    setLdaily(true);
    setPdaily(false);
  };
  const handleDailyp = () => {
    setBdaily(false);
    setLdaily(false);
    setPdaily(true);
  };
  const handleWeeklyb = () => {
    setBweekly(true);
    setLweekly(false);
    setPweekly(false);
  };
  const handleWeeklyl = () => {
    setBweekly(false);
    setLweekly(true);
    setPweekly(false);
  };
  const handleWeeklyp = () => {
    setBweekly(false);
    setLweekly(false);
    setPweekly(true);
  };
  const handleMonthlyb = () => {
    setBmonthly(true);
    setLmonthly(false);
    setPmonthly(false);
  };
  const handleMonthlyl = () => {
    setBmonthly(false);
    setLmonthly(true);
    setPmonthly(false);
  };
  const handleMonthlyp = () => {
    setBmonthly(false);
    setLmonthly(false);
    setPmonthly(true);
  };

  const handleFullscreenOpen = (chart) => {
    setFullscreenChart(chart);
    setOpen(true);
  };

  const handleFullscreenClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Daily Stats */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Daily Stats</h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={handleDailyb} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartBar className="inline-block mr-2" /> Bar
          </button>
          <button onClick={handleDailyl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartLine className="inline-block mr-2" /> Line
          </button>
          <button onClick={handleDailyp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartPie className="inline-block mr-2" /> Pie
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-xl h-80 bg-white shadow-md rounded-lg p-6 flex justify-center items-center relative">
            {bdaily && <DailyBar employeeId={id} />}
            {ldaily && <DailyLine employeeId={id} />}
            {pdaily && <DailyPie employeeId={id} className="max-h-full" />}
            <IconButton
              onClick={() => handleFullscreenOpen(bdaily ? <DailyBar employeeId={id} /> : ldaily ? <DailyLine employeeId={id} /> : <DailyPie employeeId={id} />)}
              className="absolute top-2 right-2"
              style={{ position: 'absolute', top: '8px', right: '8px' }}
            >
              <MdFullscreen />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Weekly Stats</h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={handleWeeklyb} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartBar className="inline-block mr-2" /> Bar
          </button>
          <button onClick={handleWeeklyl} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartLine className="inline-block mr-2" /> Line
          </button>
          <button onClick={handleWeeklyp} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartPie className="inline-block mr-2" /> Pie
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-xl h-80 bg-white shadow-md rounded-lg p-6 flex justify-center items-center relative">
            {bweekly && <WeeklyBar employeeId={id} />}
            {lweekly && <WeeklyLine employeeId={id} />}
            {pweekly && <WeeklyPie employeeId={id} className="max-h-full" />}
            <IconButton
              onClick={() => handleFullscreenOpen(bweekly ? <WeeklyBar employeeId={id} /> : lweekly ? <WeeklyLine employeeId={id} /> : <WeeklyPie employeeId={id} />)}
              className="absolute top-2 right-2"
              style={{ position: 'absolute', top: '8px', right: '8px' }}
            >
              <MdFullscreen />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Monthly Stats */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Monthly Stats</h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={handleMonthlyb} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartBar className="inline-block mr-2" /> Bar
          </button>
          <button onClick={handleMonthlyl} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartLine className="inline-block mr-2" /> Line
          </button>
          <button onClick={handleMonthlyp} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300">
            <FaChartPie className="inline-block mr-2" /> Pie
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-xl h-80 bg-white shadow-md rounded-lg p-6 flex justify-center items-center relative">
            {bmonthly && <MonthlyBar employeeId={id} />}
            {lmonthly && <MonthlyLine employeeId={id} />}
            {pmonthly && <MonthlyPie employeeId={id} className="max-h-full" />}
            <IconButton
              onClick={() => handleFullscreenOpen(bmonthly ? <MonthlyBar employeeId={id} /> : lmonthly ? <MonthlyLine employeeId={id} /> : <MonthlyPie employeeId={id} />)}
              className="absolute top-2 right-2"
              style={{ position: 'absolute', top: '8px', right: '8px' }}
            >
              <MdFullscreen />
            </IconButton>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleFullscreenClose} maxWidth="xl" fullWidth>
        <DialogContent>
          <div className="flex justify-end">
            <IconButton onClick={handleFullscreenClose} className="m-2">
              <MdClose />
            </IconButton>
          </div>
          {fullscreenChart}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewStats;
