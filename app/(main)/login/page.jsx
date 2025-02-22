"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import Spinner from 'react-bootstrap/Spinner';
import { UserDetailContext } from '@/app/context/UserDetailContext';
import toast from 'react-hot-toast';




const USER_CREDENTIAL = {
    "username": "naval.ravikant",
    "password": "05111974"
}

function page() {
    const { userDetails, setUserDetails } = useContext(UserDetailContext)

    const [user, setUser] = useState({
        userName: "naval.ravikant",
        password: "05111974"
    });


    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (userDetails) {
            router.push('/booking')
        }
    },)


    const submitHandler = () => {
        setLoading(true)
        if ((user.userName != USER_CREDENTIAL.username) || (user.password != USER_CREDENTIAL.password)) {
            toast.error('Invalid Username and Password')
            setLoading(false)
            return
        }

        if (typeof window !== undefined) {
            localStorage.setItem('user', JSON.stringify(user))
        }

        setUserDetails(user);
        console.log(user)
        setLoading(false)
        toast.success("Loged in Successfully")
        router.push('/booking')
    }

    return (
        <div className='relative h-screen w-screen flex  items-center justify-center bg-white'>

            <div className='w-96 h-80 bg-black rounded-md flex flex-col p-5 gap-y-16 items-center justify-center'>

                <div className='flex items-center justify-center gap-3'>
                    <Image src={"/logo.png"} width={30} height={30} alt='logo' loading='lazy' />
                    <h2 className='text-2xl'>Almanack</h2>
                </div>

                <div className='flex flex-col items-center w-[70%] h-full text-black gap-y-5 '>

                    <div className='bg-white flex items-center justify-between p-2 rounded-md gap-x-3'>
                        <Image src={'/person.png'} width={20} height={20} alt='person' loading="lazy" />
                        <input type='text' id='username' name='username' placeholder='Username' value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} className='w-full outline-none' />
                    </div>
                    <div className='bg-white flex items-center justify-between p-2 rounded-md gap-x-3'>
                        <Image src={'/keyboard.png'} width={20} height={20} alt='keyboard' loading='lazy' />
                        <input type='password' id='password' name='password' placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='w-full outline-none' />
                    </div>
                    <button className='bg-white flex items-center justify-center p-2 rounded-md w-full hover:bg-slate-300' onClick={() => submitHandler()}>Login</button>

                </div>

            </div>

            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

        </div>
    )
}

export default page