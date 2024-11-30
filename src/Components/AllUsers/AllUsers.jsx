import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [balanceAmount, setBalanceAmount] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/users')
            .then((response) => {
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch users');
                setLoading(false);
            });
    }, []);

    const handleAddBalance = (user) => {
        setSelectedUser(user);  // Set the selected user
        setShowModal(true);      // Show the modal
    };

    const handleBalanceChange = (e) => {
        setBalanceAmount(e.target.value); // Update balance input value
    };

    const handleSubmit = () => {
        if (!balanceAmount) return;
        
      
        axios.put(`http://localhost:5000/api/v1/users/${selectedUser._id}/balance`, { balance: balanceAmount })
            .then(() => {
                setUsers(prevUsers => prevUsers.map(user =>
                    user._id === selectedUser._id ? { ...user, balance: balanceAmount } : user
                ));
                setShowModal(false); // Close the modal
                setBalanceAmount(''); // Clear input
            })
            .catch((err) => {
                setError('Failed to update balance');
                setShowModal(false); // Close the modal in case of error
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border text-blue-500" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 font-semibold text-lg mt-4">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white lg:w-10/12 mx-auto overflow-y-scroll">
            <table className="min-w-full text-left text-[16px]">
                {/* Table Head */}
                <thead className="uppercase tracking-wider sticky top-0 bg-white outline outline-2 outline-neutral-200 border-t">
                    <tr>
                        <th className="px-6 py-3 border-x">User name</th>
                        <th className="px-6 py-3 border-x">User Email</th>
                        <th className="px-6 py-3 border-x">Balance</th>
                        <th className="px-6 py-3 border-x">Action</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {
                        users?.map((user, index) => (
                            <tr
                                key={index}
                                className={`border-b hover:bg-neutral-100 dark:hover:bg-neutral-600 ${index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : ''}`}
                            >
                                <th className="px-6 py-3 border-x">{user?.username}</th>
                                <td className="px-6 py-3 border-x">{user?.email}</td>
                                <td className="px-6 py-3 border-x">{user?.balance || 0}</td>
                                <td className="px-6 py-3 border-x">
                                    <button 
                                        onClick={() => handleAddBalance(user)} 
                                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
                                    >
                                        Add Balance
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Add Balance</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Enter Balance Amount</label>
                            <input
                                type="number"
                                value={balanceAmount}
                                onChange={handleBalanceChange}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
