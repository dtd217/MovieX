import React from 'react'

const MovieCasts = ({ movie }) => {
   return (
      <div className="w-full p-6">
         <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:lg:grid-cols-6 gap-5 grid-flow-row'>
            {movie.characters.map((character, index) => (
               <li className='bg-transparent rounded-full flex flex-col items-center' key={index}>
                  <img src="/images/user-img.jpg" alt="" className='rounded-full w-4/5 mb-2 opacity-60 hover:opacity-90' />
                  <span className='font-semibold text-sm text-center text-white'>{character}</span>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default MovieCasts