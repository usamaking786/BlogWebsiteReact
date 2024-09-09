import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Button from './Button'
import Logo from './Logo'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/config'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {login} from '../store/authSlice'

function Signup() {
    const {register, handleSubmit} = useForm();
    const[error,setError]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const create = async(data)=>{
        setError("")
        try {
          const userAccount = await authService.createAccount(data)
          if(userAccount){
            dispatch(login(userAccount))
            navigate("/")
          }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
   <>
   <div className="flex items-center justify-center my-5">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        type="text"
                        className='w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200'
                        {...register("name",{
                            required :true,
                        })}
                        />
                        <input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        className='w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200'
                        {...register("email",{required : true})}
                        />
                        <input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        className='w-full px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200'
                        {...register("password",{required : true})}
                        />
                        <Button type='submit'>Create Account</Button>
                    </div>
                </form>
            </div>

    </div>
   
   </>
  )
}

export default Signup