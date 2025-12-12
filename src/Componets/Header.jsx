import React, { useState, useEffect, useRef } from 'react'
import logo from './../assets/Images/logo.png'
import { HiHome,
    HiMagnifyingGlass,
    HiStar,
    HiPlayCircle,
    HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import HeaderItem from './HeaderItem';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

function Header() {
    const [toggle, setToggle] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const menu = [
        {
            name: 'HOME',
            icon: HiHome,
            path: '/'
        },
        {
            name: 'SEARCH',
            icon: HiMagnifyingGlass,
            path: '/search'
        },
        {
            name: 'WATCH LIST',
            icon: HiPlus,
            path: '/watchlist'
        },
        {
            name: 'ORIGINALS',
            icon: HiStar,
            path: '/originals'
        },
        {
            name: 'MOVIES',
            icon: HiPlayCircle,
            path: '/movies'
        },
        {
            name: 'SERIES',
            icon: HiTv,
            path: '/series'
        }
    ];

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
        navigate('/login');
    };

    const handleNavigate = (path) => {
        navigate(path);
        setShowDropdown(false);
    };

    return (
        <div className='flex items-center justify-between p-5'>
            <div className='flex gap-8 items-center'>
                <img src={logo} className='w-[80px] md:w-[115px] object-cover' alt="Logo" />
                
                <div className='hidden md:flex gap-8'>
                    {menu.map((item, index) => (
                        <HeaderItem key={index} name={item.name} Icon={item.icon} path={item.path} />
                    ))}
                </div>

                <div className='flex md:hidden gap-5'>
                    {menu.map((item, index) => index < 3 && (
                        <HeaderItem key={index} name={''} Icon={item.icon} path={item.path} />
                    ))}
                    <div className='md:hidden' onClick={() => setToggle(!toggle)}>
                        <HeaderItem name={''} Icon={HiDotsVertical} />
                        {toggle ? (
                            <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-5 py-4 rounded-lg z-50'>
                                {menu.map((item, index) => index > 2 && (
                                    <HeaderItem key={index} name={item.name} Icon={item.icon} path={item.path} />
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                    {/* Avatar clickeable */}
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <img 
                            src={user?.avatar} 
                            alt={user?.name}
                            className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                        />
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-white">{user?.name}</p>
                            <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                        {/* Icono de flecha */}
                        <svg 
                            className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-64 bg-[#1a1d29] border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-50">
                            {/* User Info Header */}
                            <div className="px-4 py-3 border-b border-gray-700 bg-[#0f1117]">
                                <p className="text-sm font-semibold text-white">{user?.name}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button
                                    onClick={() => handleNavigate('/profile')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#0f1117] hover:text-white transition-all"
                                >
                                    <FiUser className="w-5 h-5" />
                                    <span className="text-sm font-medium">Mi Perfil</span>
                                </button>

                                <button
                                    onClick={() => handleNavigate('/settings')}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#0f1117] hover:text-white transition-all"
                                >
                                    <FiSettings className="w-5 h-5" />
                                    <span className="text-sm font-medium">Configuración</span>
                                </button>

                                <div className="border-t border-gray-700 my-2"></div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    <span className="text-sm font-medium">Cerrar Sesión</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link 
                        to="/login" 
                        className="text-white hover:text-blue-400 transition-colors px-4 py-2"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/signup" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Header