import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import ViewTasks from '../components/ViewTasks';
import ViewStats from '../components/ViewStats';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';
import { IoIosAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaTasks, FaChartBar, FaArrowLeft,FaTrash, FaEdit, FaClipboardList, FaChartPie } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const login = localStorage.getItem("login");

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [uopen, setUopen] = useState(false);
  const [empdata, setEmpdata] = useState([]);
  
  const [viewemp, setViewemp] = useState(true);
  const [viewtasks, setViewtasks] = useState(false);
  const [viewstats, setViewstats] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState('');

  

  const getdata = () => {
    if (login !== "true") {
      navigate("/");
    }
    axios.get("http://localhost:8080/emp/getdata")
      .then((res) => {
        setEmpdata(res.data);
      });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
    const empid = "emp" + uuidv4().replace(/\D/g, '').substring(0, 4);
    const newData = { employeeId: empid, name, password: btoa(empid), role, email };
    const maildata = { emp_email: email, name, empid, password: empid, role };

    axios.post("http://localhost:8080/emp/add", newData)
      .then((res) => {
        console.log(res.data);
        emailjs.send('service_meyhyf7', 'template_o6tbk98', maildata, 'GzWI8GFdBI5n0kjHB').then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
          },
          (error) => {
            console.log('FAILED...', error);
          },
        );
      });
    
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  const handleTask = (employeeId) => {
    setId(employeeId);
    setViewtasks(!viewtasks);
    setViewemp(false);
    setViewstats(false);
  };

  const handleStats = (employeeId) => {
    setId(employeeId);
    setViewemp(false);
    setViewtasks(false);
    setViewstats(!viewstats);
  };

  const handleView = () => {
    setViewemp(true);
    setViewtasks(false);
    setViewstats(false);
  };

  const filterdata=empdata?.filter((item)=> item.name.includes(search) || item.employeeId.includes(search));

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:8080/emp/deleteuser/${key}`)
        .then((res) => {
          console.log(res.data);
          getdata();
        })
        .catch((e) => { console.log(e); });
    }
  };

  const handleLogout = () => {
    localStorage.setItem("userid", "");
    localStorage.setItem("login", false);
    navigate("/");
  };

  useEffect(() => {
    
    getdata();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-blue-600 text-white p-4 text-center'>
        <h1 className='text-3xl font-semibold'>AN Solutions</h1>
      </header>
      <div className='flex justify-between items-center p-5'>
        <h2 className='text-2xl font-semibold'>Admin Dashboard</h2>
        <button 
          className='bg-red-500 flex justify-center items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleLogout}
        ><IoIosLogOut className='text-2xl' />
          Logout
        </button>
      </div>

      <div className='p-5'>
        <div className='flex justify-center mb-4'>
          <button
            className='bg-green-500 flex justify-center items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleOpen}
          ><IoIosAdd className=' text-2xl' />&nbsp;
            Add Employee
          </button>
        </div>
        <div className='flex justify-center mb-4'>
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
                {filterdata?.filter((item) => item.role !== "admin").map((it) => (
                  <tr key={it.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{it.id}</td>
                    <td className="py-3 px-6 text-left">{it.employeeId}</td>
                    <td className="py-3 px-6 text-left">{it.name}</td>
                    <td className="py-3 px-6 text-left">{it.role}</td>
                    <td className="py-3 px-6 text-left">{it.email}</td>
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
                      <button
                        onClick={() => handleDelete(it.id)}
                        className="bg-red-500 flex justify-center items-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      ><FaTrash />&nbsp;
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {viewtasks && (
          <div className='flex flex-col items-center'>
            <button
              className="bg-gray-500 flex justify-center items-center hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={handleView}
            ><FaArrowLeft />&nbsp;
              Back
            </button>
            <ViewTasks id={id} />
          </div>
        )}

        {viewstats && (
          <div className='flex flex-col items-center'>
            <button
              className="bg-gray-500 flex justify-center items-center hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={handleView}
            ><FaArrowLeft />&nbsp;
              Back
            </button>
            <ViewStats id={id} />
          </div>
        )}

        <Dialog open={open} onClose={handleOpen}>
          <div className='flex justify-between items-center p-4 border-b border-gray-300'>
            <DialogTitle>Add Employee</DialogTitle>
            <button
              className='text-gray-600 hover:text-gray-800'
              onClick={handleOpen}
            >
              <IoCloseOutline className='text-2xl' />
            </button>
          </div>
          <DialogContent>
            <form className='flex flex-col gap-3'>
              <label className='flex flex-col'>
                Name
                <input
                  className='border border-gray-300 p-2 rounded'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className='flex flex-col'>
                Email
                <input
                  type='email'
                  className='border border-gray-300 p-2 rounded'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className='flex flex-col'>
                Role
                <select
                  className='border border-gray-300 p-2 rounded'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="associate">Associate</option>
                  <option value="dev">Developer</option>
                  <option value="tester">Tester</option>
                </select>
              </label>
              <button
                type='submit'
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
                onClick={handleClick}
              >
                Add Employee
              </button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={uopen} onClose={() => setUopen(false)}>
          <DialogTitle>Update Employee</DialogTitle>
          <DialogContent>
            <form className='flex flex-col gap-3'>
              {/* Add your form fields here */}
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
