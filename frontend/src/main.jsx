import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AddProduct, SignIn, SignUp, Home, Address } from './pages/index.js'
import { Protected } from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}> 
      <Route path='' element={
        <Protected authentication={false}>
          <Home />
        </Protected>
      } />
      <Route path='login' element={
        <Protected authentication={false}>
          <SignIn />
        </Protected>
      } />
      <Route path='signup' element={
        <Protected authentication={false}>
          <SignUp />
        </Protected>
      } />
      <Route path='add-product' element={
        <Protected authentication={true}>
          <AddProduct />
        </Protected>
      } />
      <Route path='addresses' element={
        <Protected authentication={true}>
          <Address />
        </Protected>
      } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
