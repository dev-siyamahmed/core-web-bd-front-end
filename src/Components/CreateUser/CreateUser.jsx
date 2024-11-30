import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function CreateUser() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false) 

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add form submission logic here
  }

  return (
    <div className=" bg-gray-50 flex items-center justify-center px-2 sm:px-3 lg:px-8 lg:py-6 md:py-6 py-4 ">
      <div className="bg-white md:p-8 p-4 rounded-xl shadow-2xl w-full sm:max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-md font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-md font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-md font-medium text-gray-600">Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-3 top-8 text-gray-500"
            >
              {passwordVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
