import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Modal({ user, closeModal, refreshUsers }) {
    const [balance, setBalance] = useState(user?.balance); 

    // Reset balance state
    useEffect(() => {
        if (user?.balance !== undefined) {
            setBalance(user.balance);
        }
    }, [user]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate balance
        if (balance < 0) {
            toast.error('Balance cannot be negative!');
            return; 
        }
        try {
            // Make API request to update balance
            const response = await axios.patch(`https://core-web-bd-task-backend.vercel.app/api/v1/users/${user._id}/balance`, { balance });

            console.log(response.data);

            if (response.data) {
                toast.success('Balance updated successfully!');
                refreshUsers(); // Refresh users list in parent component
                closeModal(); // Close modal
            } else {
                toast.error('Failed to update balance. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 md:px-0 px-2 ">
            <div className="bg-white rounded-lg p-6 w-96">
                <div>
                    <p className='text-lg'>Update Balance for <span className='text-lg font-bold'>{user?.username}</span> </p>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="balance" className="block mb-2 text-lg py-2 font-medium">
                        Current Balance: {user.balance}
                    </label>
                    <input
                        id="balance"
                        type="number"
                        value={balance || ''}
                        onChange={(e) => setBalance(Number(e.target.value))}
                        className="border rounded-lg w-full px-4 py-2 mb-4"
                        placeholder="Enter new balance"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
