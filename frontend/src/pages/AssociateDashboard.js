import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import ViewTasks from '../components/ViewTasks';
import ViewStats from '../components/ViewStats';
import { useNavigate } from 'react-router-dom';
import AddTask from '../components/AddTask';
import { IoIosAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaTasks, FaChartBar, FaArrowLeft,FaTrash, FaEdit, FaClipboardList, FaChartPie } from 'react-icons/fa';

const AssociateDashboard = () => {
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [alltasks, setAlltasks] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [empdata, setEmpdata] = useState([]);
  const [viewemp, setViewemp] = useState(true);
  const [viewtasks, setViewtasks] = useState(false);
  const [viewmytasks, setViewmytasks] = useState(false);
  const [viewstats, setViewstats] = useState(false);
  const [id, setId] = useState('');
  const userid = localStorage.getItem("userid");
  const login = localStorage.getItem("login");

  

  useEffect(() => {
    if (login !== "true") {
      navigate("/");
    }
    const fetchEmpData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/emp/getdata");
        setEmpdata(res.data);
        const currentUser = res.data.find(item => item.employeeId === userid);
        if (currentUser) setUname(currentUser.name);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    const fetchTaskData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/emp/gettasks");
        setAlltasks(res.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchEmpData();
    fetchTaskData();
  }, [userid]);

  const uniqueEmployees = {};

  alltasks.forEach(task => {
    if (!uniqueEmployees[task.employeeId]) {
      uniqueEmployees[task.employeeId] = {
        employeeId: task.employeeId,
        employeeName: task.employeeName,
        role: task.role,
        associate: task.myAssociate,
        email: empdata?.filter((item) => item.employeeId === task.employeeId)
      };
    }
  });

  const uniqueEmployeeList = Object.values(uniqueEmployees);
  const filtereddata = uniqueEmployeeList.filter((item) => item.employeeName.includes(search) || item.employeeId.includes(search));

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTask = (employeeId) => {
    setId(employeeId);
    setViewtasks(true);
    setViewemp(false);
    setViewstats(false);
  };

  const handleStats = (employeeId) => {
    setId(employeeId);
    setViewemp(false);
    setViewtasks(false);
    setViewstats(true);
  };

  const handleView = () => {
    setViewemp(true);
    setViewtasks(false);
    setViewstats(false);
    setViewmytasks(false);
  };

  const handleShow = () => {
    setId(userid);
    setViewmytasks(true);
    setViewemp(false);
    setViewtasks(false);
    setViewstats(false);
  };

  const handleChange = () => {
    setId(userid);
    setViewemp(!viewemp);
    setViewstats(!viewstats);
  }

  const handleLogout = () => {
    localStorage.setItem("userid", "");
    localStorage.setItem("login", "false");
    navigate("/");
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-blue-600 text-white p-4 text-center'>
        <h1 className='text-3xl font-semibold'>AN Solutions</h1>
      </header>
      
      <div className='flex justify-between items-center p-5'>
        <h2 className='text-2xl font-semibold'>Associate Dashboard</h2>
        <button
          className='bg-red-500 flex justify-center items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleLogout}
        ><IoIosLogOut className=' text-2xl'/>
          Logout
        </button>
      </div>

      <div className='p-5'>
        <div className='flex justify-center items-center gap-4 mb-4'>
          <button
            className='bg-green-500 flex justify-center items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleClick}
          ><IoIosAdd className=' text-2xl' />&nbsp;
            Add Task
          </button>
          <button
            className='bg-indigo-500 flex justify-center items-center hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out'
            onClick={handleShow}
          ><FaClipboardList />&nbsp;
            My Tasks
          </button>
          <button
            className='bg-indigo-500 flex justify-center items-center hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out'
            onClick={handleChange}
          ><FaChartPie />&nbsp;
            My Stats
          </button>
        </div>
        <div className='flex justify-center items-center gap-4 mb-4'>
          <input
            type='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Search by Employee ID or Name'
          />
        </div>

        {viewemp && (
          <div className='container mx-auto p-4'>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">S.No</th>
                  <th className="py-3 px-6 text-left">Employee ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filtereddata?.filter(item => item.employeeId !== userid && item.associate === uname).map((it, index) => (
                  <tr key={it.employeeId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{it.employeeId}</td>
                    <td className="py-3 px-6 text-left">{it.employeeName}</td>
                    <td className="py-3 px-6 text-left">{it.role}</td>
                    <td className="py-3 px-6 text-left">{it.email[0]?.email}</td>
                    <td className="py-3 px-6 text-left flex gap-2">
                      <button
                        onClick={() => handleTask(it.employeeId)}
                        className="bg-teal-500 flex justify-center items-center hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                      ><FaTasks />&nbsp;
                        View Task
                      </button>
                      <button
                        onClick={() => handleStats(it.employeeId)}
                        className="bg-purple-500 flex justify-center items-center hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                      ><FaChartBar />&nbsp;
                        View Stats
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {viewmytasks && (
          <div className="flex flex-col">
            <button
              className="bg-gray-500 flex justify-center items-center hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/4 mb-4"
              onClick={handleView}
            ><FaArrowLeft />&nbsp;
              Back
            </button>
            <ViewTasks id={id} user={true} />
          </div>
        )}

        {viewtasks && (
          <div className="flex flex-col">
            <button
              className="bg-gray-500 flex justify-center items-center hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/4 mb-4"
              onClick={handleView}
            ><FaArrowLeft />&nbsp;
              Back
            </button>
            <ViewTasks id={id} user={false} />
          </div>
        )}

        {viewstats && (
          <div className="flex flex-col">
            <button
              className="bg-gray-500 flex justify-center items-center hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/4 mb-4"
              onClick={handleView}
            ><FaArrowLeft />&nbsp;
              Back
            </button>
            <ViewStats id={id} />
          </div>
        )}
      </div>

      {open && <AddTask open={true} method={"add"} id={userid} />}
    </div>
  );
}

export default AssociateDashboard;
