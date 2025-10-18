import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {login as storeLogin} from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from '../index'
import { useState } from 'react'
import authService from '../../../../appwrite/auth'


export default function SignUp() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);

    const create = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.createUser(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(storeLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
            console.log("Error while sending data to login:", error);
        } finally {
            setLoading(false);
        }
    }

    return !loading ? (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" /> 
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create an account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link 
                    to="/login" 
                    className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className="space-y-5">
                        <Input 
                        label="Name:" 
                        placeholder="Enter your full name" 
                        {...register("name", {
                            required: true,
                        })}
                        />
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
                                matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/gm.test(value) || setError("- at least 5 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters"),
                            }
                         })}
                        />
                        <Button 
                        type="submit" 
                        className='w-1/3 mx-auto text-center justify-center flex rounded-lg py-2  hover:bg-blue-400'
                        >Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    ) : ( <h1 className='text-center'><i>Creating the new user...</i></h1> )
};