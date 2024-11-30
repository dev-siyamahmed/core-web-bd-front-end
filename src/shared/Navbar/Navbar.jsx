import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; 
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const menuRef = useRef(null); 
    const navLinks = [
        { name: "Create User", path: "/" },
        // { name: "User List", path: "/all-users" },
    ];

    // Close the menu if a click happens outside the mobile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        // Add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <>
            <nav className="bg-gray-50 text-gray-600 shadow-md">
                <div className="w-full mx-auto px-4 py-4 flex items-center">
                    {/* Hamburger Icon (Mobile) */}
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)} 
                        className="lg:hidden text-2xl text-gray-700"
                    >
                        <FaBars />
                    </button>

                    {/* Navigation Links (Desktop) */}
                    <ul className="hidden lg:flex space-x-6 text-lg justify-center w-full">
                        {navLinks?.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.path}
                                    className={`block py-2 px-4 text-center transition ${location.pathname === link.path ? 'text-[#0505bd] font-bold' : 'text-gray-700'} hover:text-[#0505bd]`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Menu (Side Slide) */}
                {menuOpen && (
                    <div 
                        ref={menuRef} 
                        className="lg:hidden fixed top-0 left-0 w-3/4 md:w-2/4 h-full bg-gray-50 text-gray-700 z-50 shadow-lg"
                    >
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-900 text-2xl p-1 bg-gray-200 rounded-md"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <ul className="space-y-3 px-3">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className={`block text-gray-700 hover:text-blue-400 transition ${location.pathname === link.path ? 'text-blue-400 font-bold' : ''}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </>
    );
}
