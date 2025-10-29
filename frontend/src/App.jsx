import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'
import service from '../../appwrite/config'
import { initiateState } from './store/productSlice'


function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    setLoading(true);
    authService.getCurrentUser()
      .then((userData)=>{
        if(userData) {
          dispatch(login({userData}));
          service.getOtherData(userData.$id).then((otherData)=>{
            if(otherData) {
              // dispatch(addOtherData(otherData.addresses))
              dispatch(initiateState(otherData))
            }
          })

        } else {
          dispatch(logout())
        };
      })
      .catch((error) => {
        console.error("Auth error:", error);
      })
      .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <>
      <div className='min-h-screen flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
            <main>
              <Outlet />
            </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (<><h1 className='text-center'><i>Loading...</i></h1></>)
}

export default App
