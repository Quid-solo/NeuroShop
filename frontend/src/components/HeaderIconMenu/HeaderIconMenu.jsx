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
    const popupRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
              ref.current && 
              !ref.current.contains(e.target) && 
              popupRef.current && 
              !popupRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const logoutHandler = () => {
      console.log("logoutclicked");
      authService.logout().then(()=>{
      dispatch(logout());
      navigate('/');
      })
    }

    return (
    <div className="user-menu-wrapper" ref={ref}>
      <FaUserCircle
        size={30}
        className="my-auto mx-2 inline-block cursor-pointer"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', fontSize: '2rem' }}
      />
      {open && 
        createPortal(
          <div className="fixed top-14 right-5 bg-white border border-gray-300 shadow-lg rounded-md z-[9999] w-48 pointer-events-auto">
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >My Account</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >My Products</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >My Orders</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >Wishlist</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"><Button onClick={logoutHandler}>Logout</Button></li>
            </ul>
          </div>,
          document.body
        )
      }
    </div>
    )
};