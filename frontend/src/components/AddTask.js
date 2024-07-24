import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';

const AddTask = ({ open, method, data, id, setInserted }) => {
    const [isopen, setIsOpen] = useState(open);
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [st, setSt] = useState("");
    const [ed, setEd] = useState("");
    const [cat, setCat] = useState("");
    const [ass, setAss] = useState("");
    const [dt, setDt] = useState([]);
    const [proj, setProj] = useState("");

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    useEffect(() => {
        if (method === "update" && data) {
            setDate(data.date);
            setDesc(data.description);
            setSt(data.startTime);
            setEd(data.endTime);
            setCat(data.taskCategory);
            setAss(data.myAssociate);
            setProj(data.project);
        }
    }, [method, data]);

    const getdata = () => {
        axios.get(`http://localhost:8080/emp/data/${id}`)
            .then((res) => {
                setDt(res.data);
            });
    };

    const calculateWorkingHours = (start, end) => {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);
        const difference = (endTime - startTime) / (1000 * 60 * 60); // Difference in hours
        return difference;
    };

    const handleClick = (e) => {
        e.preventDefault();
        const workingHours = calculateWorkingHours(st, ed);
        if (workingHours > 8) {
            alert("Working hours cannot exceed 8 hours.");
            return;
        }
        const newData = {
            employeeId: id,
            employeeName: dt[0]?.name,
            role: dt[0]?.role,
            project: proj,
            date: date,
            startTime: st,
            endTime: ed,
            taskCategory: cat,
            description: desc,
            myAssociate: ass,
        };
        axios.post("http://localhost:8080/emp/task", newData).then((res) => {
            console.log(res.data);
            setIsOpen(false);
            setInserted(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch(error => {
            console.error("There was an error adding the task!", error);
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const newData = {
            employeeId: id,
            employeeName: dt[0]?.name,
            role: dt[0]?.role,
            project: proj,
            date: date,
            startTime: st,
            endTime: ed,
            taskCategory: cat,
            description: desc,
            myAssociate: ass,
        };
        axios.put(`http://localhost:8080/emp/update/${data.id}`, newData).then((res) => {
            console.log(res.data);
            setIsOpen(false);
        }).catch(error => {
            console.error("There was an error updating the task!", error);
        });
    };

    return (
        <div>
            <Dialog open={isopen} onClose={() => setIsOpen(false)}>
                <div className='flex justify-between items-center p-4 border-b'>
                    <DialogTitle className='m-0 p-0'>Add Task</DialogTitle>
                    <div className='cursor-pointer text-gray-500 hover:text-gray-700' onClick={() =>{
                      window.location.reload();
                      setIsOpen(false)}}>
                        <IoCloseOutline size={24} />
                    </div>
                </div>
                <DialogContent className='p-4'>
                    <form className='flex flex-col gap-4'>
                        <label className='flex flex-col'>
                            EMPLOYEE ID
                            <input
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='EMP ID'
                                value={id}
                                readOnly
                            />
                        </label>
                        <label className='flex flex-col'>
                            Description
                            <input
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Task Description'
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-col'>
                            Date
                            <input
                                type='date'
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-col'>
                            Start Time
                            <input
                                type='time'
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={st}
                                onChange={(e) => setSt(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-col'>
                            End Time
                            <input
                                type='time'
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={ed}
                                onChange={(e) => setEd(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-col'>
                            Project
                            <input
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Project Name'
                                value={proj}
                                onChange={(e) => setProj(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-col'>
                            Category
                            <input
                                type='text'
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                            />
                        </label>
                        <label className='flex flex-col'>
                            Associate
                            <input
                                type='text'
                                className='p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={ass}
                                onChange={(e) => setAss(e.target.value)}
                            />
                        </label>
                        {method === "update" ? (
                            <button
                                type='submit'
                                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200'
                                onClick={(e) => handleUpdate(e)}
                            >
                                Update Task
                            </button>
                        ) : (
                            <button
                                type='submit'
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200'
                                onClick={(e) => handleClick(e)}
                            >
                                Add Task
                            </button>
                        )}
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTask;
