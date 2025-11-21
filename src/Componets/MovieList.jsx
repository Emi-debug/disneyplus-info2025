import React, { useEffect, useRef, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import FavoriteButton from './Favoritebutton';


function MovieList({genreId, index_}) {
    const elementRef = useRef(null);
    
    const { data: movieList = [], isLoading, isError, error } = useQuery({
        queryKey: ['movies', genreId],
        queryFn: () => GlobalApi.getMovieByGenreId(genreId),
        select: (response) => response.data.results,
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) return <p className="text-white">Cargando películas...</p>

    if (isError)
      return (
        <p className="text-red-500">
          Error al cargar: {error.message}
        </p>
      )

  

    const slideRight=(element)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element)=>{
        element.scrollLeft-=500;
    }
  return (
    <div className='relative'>
         <IoChevronBackOutline onClick={()=>slideLeft(elementRef.current)} 
         
         
         className={`text-[50px] text-white
           p-2 z-10 cursor-pointer 
             md:block absolute
            ${index_%3==0?'mt-[80px]':'mt-[150px]'} `}/>
          
   
    <div ref={elementRef} className='flex overflow-x-auto gap-8
        scroll-smooth scrollbar-hide pt-4 px-3 pb-4 overflow-y-hidden'>
        {movieList.map((item,index)=>(
    <div key={item.id} className='relative flex-shrink-0'>
        <MovieCard movie={item} />
        
        {/* Top right button */}
        <div className='absolute top-2 right-2 z-10 group-hover:opacity-100 transition-opacity 
        duration-200 bg-black bg-opacity-40 rounded-lg'>
            <FavoriteButton movieId={item.id} />
        </div>
    </div>
        ))}
    </div>
    <IoChevronForwardOutline onClick={()=>slideRight(elementRef.current)}
           className={`text-[50px] text-white  md:block
           p-2 cursor-pointer z-10 top-0 absolute right-0 
             
            ${index_%3==0?'mt-[80px]':'mt-[150px]'}`}/> 
    </div>
  )
}

export default MovieList