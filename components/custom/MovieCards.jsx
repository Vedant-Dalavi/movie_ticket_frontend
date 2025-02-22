import React, { useState } from 'react'
import { moviesData } from '@/data/moviesData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'



function MovieCards({ searchData }) {

  const router = useRouter();
  const [loading, setLoading] = useState(false)


  const clickHandler = (id) => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/selection/${id}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className='relative grid grid-cols-3 grid-rows-2'>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {
        searchData && searchData.map((movie) => (
          <div key={movie.id} className='flex flex-col items-start justify-center p-3 gap-y-3 hover:scale-105 transition-all duration-300 cursor-pointer' onClick={() => clickHandler(movie.id)} >

            <Image src={movie.path} width={350} height={100} alt={movie.path} loading='lazy' />
            <h2>{movie.name}</h2>

          </div>
        ))
      }

    </div>
  )
}

export default MovieCards