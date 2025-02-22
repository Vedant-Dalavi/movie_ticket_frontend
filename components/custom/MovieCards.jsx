import React, { useState } from 'react'
import { moviesData } from '@/data/moviesData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'



function MovieCards({ searchData }) {

  const router = useRouter();
  const [loading, setLoading] = useState(false)


  const clickHandler = (id) => {

    setLoading(true);
    router.push(`/selection/${id}`)
    setLoading(false);

  }
  return (
    <div className='relative grid grid-cols-3 grid-rows-2'>
      {
        searchData && searchData.map((movie) => (
          <div key={movie.id} className='flex flex-col items-start justify-center p-3 gap-y-3 hover:scale-105 transition-all duration-300 cursor-pointer' onClick={() => clickHandler(movie.id)} >

            <Image src={movie.path} width={350} height={100} alt={movie.path} loading='lazy' />
            <h2>{movie.name}</h2>

          </div>
        ))
      }
      {
        loading && <div className='absolute w-full h-full flex items-center justify-center bg-white opacity-80 '>
          <h2 className='text-2xl'>...Loading</h2>
        </div>

      }
    </div>
  )
}

export default MovieCards