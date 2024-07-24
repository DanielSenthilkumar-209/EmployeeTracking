import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ViewTasks = ({ id, user }) => {
  const [data, setData] = useState([]);
  const [ndata, setNdata] = useState(null);
  const [method, setMethod] = useState('');

  // Function to fetch tasks
  const getdata = () => {
    axios.get(`http://localhost:8080/emp/task/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("Failed to fetch tasks");
      });
  };

  // Function to handle task deletion
  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      axios.delete(`http://localhost:8080/emp/delete/${key}`)
        .then(() => {
          toast.success("Task deleted successfully");
          getdata(); // Refresh data after deletion
        })
        .catch(() => {
          toast.error("Failed to delete the task");
        });
    }
  };

  // Function to handle update
  const handleUpdate = (task) => {
    setNdata(task);
    setMethod("update");
  };

  // Fetch tasks on component mount
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <ToastContainer autoClose={2000} />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">S.No</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Start Time</th>
            <th className="py-3 px-6 text-left">End Time</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Project</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Associate</th>
            {user && <th className="py-3 px-6 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((it, index) => (
            <tr key={it.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
              <td className="py-3 px-6 text-left">{it.date}</td>
              <td className="py-3 px-6 text-left">{it.startTime}</td>
              <td className="py-3 px-6 text-left">{it.endTime}</td>
              <td className="py-3 px-6 text-left">{it.description}</td>
              <td className="py-3 px-6 text-left">{it.project}</td>
              <td className="py-3 px-6 text-left">{it.taskCategory}</td>
              <td className="py-3 px-6 text-left">{it.myAssociate}</td>
              {user && (
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => handleUpdate(it)}
                    className="bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                  ><FaEdit />&nbsp;
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(it.id)}
                    className="bg-red-500 flex justify-center items-center hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  ><FaTrash />&nbsp;
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {method === "update" && ndata && (
        <AddTask open={true} data={ndata} method={method} id={id} setInserted={() => getdata()} />
      )}
    </div>
  );
}

export default ViewTasks;
