import {useSelector} from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import { Logo, Container, HeaderIconMenu } from '../index';

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
        
    ]

    return(
        <header className='py-3 shadow bg-gray-500'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px' />  
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
              {authActive && <HeaderIconMenu/>}
            </ul>
          </nav>
        </Container>
      </header>
    )

}