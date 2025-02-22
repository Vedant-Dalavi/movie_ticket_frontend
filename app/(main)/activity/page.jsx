"use client"
import { UserDetailContext } from '@/app/context/UserDetailContext';
import { CircleUserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

function page() {


    const { userDetails } = useContext(UserDetailContext);

    const [bookedMovies, setBookedMovies] = useState([]);
    const router = useRouter();


    useEffect(() => {

        if (userDetails === undefined) return;

        if (!userDetails) {
            router.replace("/login");
            return;
        }

        const storedMovies = localStorage.getItem("bookingDetails");
        setBookedMovies(storedMovies ? JSON.parse(storedMovies) : []);
    }, [userDetails, router]);

    return (
        <div className='text-black w-full rounded-lg '>

            {/* user icon and username */}
            <div className='flex items-center justify-end'>
                <div className='flex flex-row items-center justify-between gap-x-2'>
                    <div className='p-4 w-14 h-14 rounded-full bg-[#D9D9D9] flex items-center justify-center'>
                        <CircleUserRound />
                    </div>
                    <div>

                        <p className='text-black ' >Naval</p>
                        <p className='text-black ' >Ravikant</p>
                    </div>
                </div>
            </div>

            {/* movie booking details */}

            <div className='mt-2 w-[80%]'>

                <ul className='flex flex-row items-center gap-x-32 border-b border-black p-2'>
                    <li>ID</li>
                    <li>Movie</li>
                    <li>Tickets</li>
                    <li>Amount</li>
                    <li>Time</li>
                    <li>Date</li>
                </ul>

                <ul className='text-black'>
                    {
                        bookedMovies ? bookedMovies.map((movie, index) => (



                            <table key={index} className='flex flex-row items-center gap-x-32 border-b border-black p-2'>

                                <td width={10}>{movie.id < 10 ? `0${movie.id}` : `${movie.id}`}</td>
                                <td width={60}>{movie.movieName}</td>
                                <td width={40}>{movie.ticket}</td>
                                <td width={50}> {"$" + movie.price + ".00"}</td>
                                <td width={20}>{movie.time}</td>
                                <td>{movie.date}</td>
                            </table>

                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    No bookings found.
                                </td>
                            </tr>
                        )
                    }
                </ul>

            </div>

        </div>
    )
}

export default page