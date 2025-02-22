"use client"
import { UserDetailContext } from '@/app/context/UserDetailContext'
import { Download, Inbox } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'


function Sidebar() {

    const { id } = useParams()

    const { userDetails, setUserDetails } = useContext(UserDetailContext)

    const pathname = usePathname();

    console.log(pathname)


    useEffect(() => {
        setUserDetails(localStorage.getItem('user'))
    })



    return (
        <>

            {


                userDetails && <div className='w-[20%] flex flex-col items-center bg-black h-full rounded-lg px-4 py-8'>

                    <div className='flex items-center justify-center gap-x-4'>
                        <Image src={"/logo.png"} width={40} height={40} alt='logo' loading='lazy' />
                        <h2 className='text-2xl'>Almanack</h2>
                    </div>

                    <div className='flex flex-col items-center justify-center w-[80%] text-2xl mt-14 gap-y-5'>

                        <div className={`flex items-center gap-x-5 ${(pathname == '/booking' || pathname == `/selection/${id}`) && "bg-white text-black"}  rounded-md w-full justify-centern p-2`}>

                            <Inbox className='text-xl' />

                            <Link href={"/booking"}>Booking</Link>
                        </div>

                        <div className={`flex items-center gap-x-5 ${pathname == '/activity' && "bg-white text-black"} rounded-md w-full justify-centern p-2`}>
                            <Download className='text-xl' />

                            <Link href={"/activity"}>Activity</Link>
                        </div>

                    </div>
                    

                </div>
            }
        </>
    )
}

export default Sidebar