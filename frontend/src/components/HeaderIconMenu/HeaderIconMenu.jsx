import { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import authService from '../../appwrite/auth'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout, setAuthLoading} from '../../store/authSlice'
import {Button} from '../index'

export default function HeaderIconMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const authActive = useSelector(state => state.auth.active);

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
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(setAuthLoading(false));
      navigate('/');
    });
  };

  const navItems = [
    { name: 'My Addresses', url: '/addresses', active: authActive },
    { name: 'My Products', url: '/my-products', active: authActive },
    { name: 'Orders', url: '/orders', active: authActive },
    { name: 'Wishlist', url: '/wishlist', active: authActive },
  ];

  return (
    <div className="relative" ref={ref}>
      <FaUserCircle
        size={30}
        className="my-auto mx-2 inline-block cursor-pointer"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', fontSize: '2rem' }}
      />
      {open && (
        <div className="absolute top-10 right-0 bg-white border border-gray-300 shadow-lg rounded-md z-[9999] w-48">
          <ul className="divide-y divide-gray-200">
            {navItems.map(item =>
              item.active ? (
                <li
                  key={item.name}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(item.url)}
                >
                  {item.name}
                </li>
              ) : null
            )}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-end">
              <Button onClick={logoutHandler}>Logout</Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
