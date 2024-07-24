import React from 'react'
import { FaTasks, FaChartBar, FaTrash, FaEdit, FaClipboardList, FaChartPie } from 'react-icons/fa';

const ViewEmployee = ({data}) => {
  return (
    <div className='container mx-auto p-4'>
      <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">S.No</th>
            <th className="py-3 px-6 text-left">Employee ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Actions</th>
        </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
            {data?.map((it)=>{
                return(
                    <tr key={it.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{it.id}</td>
                        <td className="py-3 px-6 text-left">{it.employeeId}</td>
                        <td className="py-3 px-6 text-left">{it.name}</td>
                        <td className="py-3 px-6 text-left">{it.role}</td>
                        <td className="py-3 px-6 text-left">{it.email}</td>
                        <td className="py-3 px-6 text-left"> 
                            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                View Stats
                            </button>   
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">
                                Update
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default ViewEmployee
