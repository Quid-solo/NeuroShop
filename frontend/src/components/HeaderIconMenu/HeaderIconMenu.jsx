import { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {createPortal} from 'react-dom'
import authService from '../../../../appwrite/auth'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import {Button} from '../index'
 
export default function HeaderIconMenu(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const logoutHandler = () => {
            authService.logout().then(()=>{
                dispatch(logout());
                navigate('/');
            })
        }

    return (
    <div className="user-menu-wrapper" ref={ref}>
      <FaUserCircle
        className="user-icon"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', fontSize: '2rem' }}
      />
      {open && 
        createPortal(
          <div className="fixed top-14 right-5 bg-white border border-gray-300 shadow-lg rounded-md z-[9999] w-48">
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Profile clicked')}>Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Settings clicked')}>Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logoutHandler} >Logout</li>
            </ul>
          </div>,
          document.body
        )
      }
    </div>
    )
};