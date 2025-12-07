import { Link } from 'react-router-dom';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/features/authSlice';

const Navbar = () => {
    const {user} = useSelector(state => state.auth)
    const dispath = useDispatch()

    const logoutHandler = () => {
        dispath(logout())
    }
  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto py-3.5 px-4 text-slate-800 transition-all'>
            <Link>
                <img src="/logo.svg" alt="" className='h-11 w-auto' />
            </Link>
            <div className="flex items-center gap-4 text-sm">
                <p className='max-sm:hidden'>Hi, {user?.name}</p>
                <button onClick={logoutHandler} className='px-7 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-slate-50 cursor-pointer active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
