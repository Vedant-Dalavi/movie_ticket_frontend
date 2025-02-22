"use client"

import Sidebar from '@/components/custom/Sidebar'
import React, { useState } from 'react'
import { UserDetailContext } from './context/UserDetailContext';

function Provider({ children }) {
    const [userDetails, setUserDetails] = useState();
    return (
        <div className='w-full h-screen p-5 bg-white flex flex-row gap-x-5'>

            <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>

                <Sidebar />
                {children}
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider