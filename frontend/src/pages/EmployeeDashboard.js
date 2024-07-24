import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ViewTasks from '../components/ViewTasks';
import AddTask from '../components/AddTask';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import ViewStats from '../components/ViewStats';
import { IoIosAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaTasks, FaChartBar, FaArrowLeft,FaTrash, FaEdit, FaClipboardList, FaChartPie } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const [inserted, setInserted] = useState(false);
  const [data, setData] = useState([]);
  const [open, setIsOpen] = useState(false);
  const [viewtask, setViewtask] = useState(true);
  const [viewstats, setStats] = useState(false);
  const userid = localStorage.getItem("userid");
  const login = localStorage.getItem("login");

  const [dt, setDt] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  if (login !== "true") {
    navigate("/");
  }

  if (inserted) {
    toast.success("Task added successfully");
  }

  const handleLogout = () => {
    localStorage.setItem("userid", "");
    localStorage.setItem("login", false);
    navigate("/");
  };

  const handleChange = () => {
    setViewtask(!viewtask);
    setStats(!viewstats);
  };

  const getdata = () => {
    
    axios.get(`http://localhost:8080/emp/task/${userid}`)
      .then((res) => {
        setData(res.data);
      });
    axios.get(`http://localhost:8080/emp/data/${userid}`)
      .then((res) => {
        setDt(res.data);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className='h-screen w-screen bg-gray-100'>
      <header className='bg-blue-500 p-4 text-white text-center'>
        <h1 className='text-3xl font-semibold'>AN Solutions</h1>
      </header>
      <div className='flex flex-col justify-center items-center'>
        <div className='relative w-full'>
          <h2 className='text-2xl font-semibold text-gray-800 mt-4'>Employee Dashboard</h2>
          <button 
            className='bg-red-500 flex justify-center items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute right-5 top-5'
            onClick={handleLogout}
          ><IoIosLogOut />
            Logout
          </button>
        </div>
        <div className='mt-8 flex gap-4'>
          <button 
            className='bg-green-500 flex justify-center items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
            onClick={() => setIsOpen(!open)}
          ><IoIosAdd className=' text-2xl' />&nbsp;
            Add Task
          </button>
          <button 
            className='bg-indigo-500 flex justify-center items-center hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
            onClick={() => handleChange()}
          ><FaChartPie />&nbsp;
            View My Stats
          </button>
        </div>
        
        {viewtask && (
          <div className='mt-10 w-full'>
            <ViewTasks id={userid} user={true} />
          </div>
        )}
        {open && (
          <AddTask open={true} setInserted={setInserted} method={"add"} id={userid} />
        )}
        {viewstats && (
          <div className='mt-4'>
            <button 
              className='bg-gray-500 flex justify-center items-center hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'
              onClick={handleChange}
            ><FaArrowLeft />&nbsp;
              Back
            </button>
            <ViewStats id={userid} />
          </div>
        )}

        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
