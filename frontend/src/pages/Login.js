import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [sid, setSid] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!sid) {
            toast.warning("Please enter Employee ID");
            return;
        }
        if (!pass) {
            toast.warning("Please enter password");
            return;
        }
        try {
            const newdata = { employeeId: sid, password: window.btoa(pass) };
            axios.post("http://localhost:8080/emp/login", newdata).then((res) => {
                if (res.data === "invalid") {
                    toast.warning("Login failed");
                } else {
                    localStorage.setItem("userid", sid);
                    localStorage.setItem("login", true);
                    if (res.data === "admin") {
                        navigate("/admindashboard");
                    } else if (res.data === "associate") {
                        navigate("/associatedashboard");
                    } else {
                        navigate("/employeedashboard");
                    }
                }
            });
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-gray-800'>
        <header className='mb-10 text-center'>
        <h1 className='text-4xl font-bold text-yellow-500' style={{ fontFamily: 'Lobster, cursive' }}>AN Solutions</h1>
        <h1 className='text-4xl font-bold text-yellow-500' style={{ fontFamily: 'Roboto, sans-serif' }}>Employee Time Tracking System</h1>
    </header>
            <div className="flex justify-center items-center w-80 h-96 rounded-lg bg-gray-700 shadow-lg shadow-gray-900">
                <form
                    onSubmit={handlesubmit}
                    className="flex flex-col items-center">
                    <h2 className='text-3xl font-serif font-semibold text-white mb-6'>
                        Login
                    </h2>
                    <input
                        type="text"
                        placeholder='Employee ID'
                        value={sid}
                        onChange={(e) => { setSid(e.target.value) }}
                        className='p-2 m-2 border-b-2 border-gray-500 focus:border-yellow-500 rounded-lg outline-none bg-gray-600 text-white placeholder-gray-400'
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        value={pass}
                        onChange={(e) => { setPass(e.target.value) }}
                        className='p-2 m-2 border-b-2 border-gray-500 focus:border-yellow-500 rounded-lg outline-none bg-gray-600 text-white placeholder-gray-400'
                    />
                    <button
                        type='submit'
                        className="m-2 bg-yellow-500 hover:bg-yellow-600 text-gray-800 w-3/6 h-12 rounded-lg text-center">
                        Login
                    </button>
                </form>
                <ToastContainer position='top-right' autoClose={3000} />
            </div>
        </div>
    )
}

export default Login;
