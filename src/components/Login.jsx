import React from 'react'
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appwrite/config';
import Button from './Button';
import Logo from './Logo';
import {useDispatch} from 'react-redux'
import {login} from '../store/authSlice'



function Login() {
    const dispatch = useDispatch()
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()

    const Login = async (data)=>{
        try {
            const session = await authService.login(data)
            if(session){
                // console.log("login Successful");
                dispatch(login(session));
                navigate("/");
            }
        } catch (error) {  
            setError(error.message)
        }
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(Login)} className='mt-8'>
                <div className='space-y-5'>
                    <input
                    label="Email: "
                    placeholder="Enter your email"
                    className="w-full"
                    type="email"
                    {...register("email", {
                        required: true
                        }
                        )}
                    />
                    <input
                    label="Password: "
                    type="password"
                    className='w-full'
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
      )
}

export default Login
