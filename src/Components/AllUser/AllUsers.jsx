import React, { useEffect, useState } from 'react';
import Modal from "../AllUser/Modal"
import useAxiosPublic from '../../Hooks/useAxiosPublic';


export default function AllUsers() {

    const axiosPublic = useAxiosPublic()
    const [users, setUsers] = useState([]); // Store all users
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [selectedUser, setSelectedUser] = useState(null); // Selected user data

    // Fetch users on component mount
    const fetchUsers = async () => {
        setLoading(true);

        try {
            
            const response = await axiosPublic.get('/users');
            setUsers(response.data.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    // Open Modal and set selected user
    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="overflow-x-auto bg-white lg:w-10/12 mx-auto overflow-y-scroll">
            <table className="min-w-full text-left md:text-[16px] text-[14px] ">
                <thead className="uppercase tracking-wider sticky top-0 bg-white outline outline-2 outline-neutral-200 border-t">
                    <tr>
                        <th className="px-6 py-3 border-x">User Name</th>
                        <th className="px-6 py-3 border-x">User Email</th>
                        <th className="px-6 py-3 border-x">Balance</th>
                        <th className="px-6 py-3 border-x">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr
                            key={user?._id}
                            className={`border-b hover:bg-neutral-100 ${index % 2 === 0 ? 'bg-neutral-50' : ''
                                }`}
                        >
                            <th className="px-6 py-3 border-x">{user?.username}</th>
                            <td className="px-6 py-3 border-x">{user?.email}</td>
                            <td className="px-6 py-3 border-x">{user?.balance}</td>
                            <td className="md:px-6 px-1 py-2 border-x">
                                <button
                                    onClick={() => handleOpenModal(user)}
                                    className="text-white bg-blue-500 hover:bg-blue-600 px-1 md:px-4 md:py-2 py-1 rounded-lg focus:outline-none transition-all duration-200"
                                >
                                    Add Balance
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && selectedUser && (
                <Modal
                    user={selectedUser} // Pass selected user to Modal
                    closeModal={handleCloseModal} // Close Modal
                    refreshUsers={fetchUsers} // Refresh user list
                />
            )}
        </div>
    );
}

// Loader Component
const Loader = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-blue-500" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

// Error Message Component
const ErrorMessage = ({ message }) => (
    <div className="text-center text-red-500 font-semibold text-lg mt-4">{message}</div>
);
