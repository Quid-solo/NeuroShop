import {useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import { Logo, Container, HeaderIconMenu } from '../index';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header () {

    const authActive = useSelector(state => state.auth.active);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            url: '/',
            active: true,
        },
        {
            name: 'Login/Signup',
            url: '/login',
            active: !authActive,
        },
        {
            name: 'Add product',
            url: '/add-product',
            active: authActive,
        },
        
    ]

    return(
        <header className='py-3 shadow bg-gray-500'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='130px' />  
              </Link>
            </div>
            <ul className='flex ml-auto'>
              {navItems.map((item)=> 
                item.active ? (
                <li key={item.name}>
                  <button 
                    onClick={()=>navigate(item.url)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full mx-2'>{item.name}</button>
                </li>) : null
              )}
              {authActive && <FaShoppingCart size={30} 
              className='mx-2 my-auto inline-block cursor-pointer' 
              onClick={()=>navigate('/cart')}/>}
              {authActive && <HeaderIconMenu/>}
            </ul>
          </nav>
        </Container>
      </header>
    )

}