import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {setAuthLoading, login as storeLogin} from '../../store/authSlice'
import {Button, Input, LoadingSpinner, Logo} from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useState } from 'react'
import service from '../../appwrite/config'
import { initiateState} from '../../store/productSlice'

export default function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                console.log("userData", userData);
                if(userData) {
                    dispatch(storeLogin(userData));
                    dispatch(setAuthLoading(false));
                    const otherData = await service.getOtherData(userData.$id);
                    console.log(otherData);
                    if(otherData) dispatch(initiateState(otherData));
                }
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
            console.log("Error while sending data to login:", error);
        } finally {
            setLoading(false);
        }
    }

    return !loading ?  (
        <div 
        className='flex items-center justify-center w-full'
        >
            <div 
            className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link 
                    to="/signup" 
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                        label= "Email:" 
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || setError("Email address must be a valid address"),
                            }
                        })} 
                        />
                        <Input 
                         label="Password:" 
                         type="password" 
                         placeholder="Enter your password"
                         {...register("password", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || setError("- at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters"),
                            }
                         })}
                        />
                        <Button 
                        type="submit" 
                        className='w-1/3 mx-auto text-center justify-center flex rounded-lg py-2  hover:bg-blue-400'
                        >Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    ) : ( 
        <>
        <LoadingSpinner />
        <h1 className='text-center'><i>Loging in...</i></h1> 
        </>
        )
};