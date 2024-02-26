import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = () => {
   return (
      <section className="my-8 text-gray-600 flex justify-center">
         <div className="flex flex-wrap gap-1 justify-center items-center *:flex *:items-center *:justify-center *:border-2 *:size-9 *:text-center *:my-auto">
            <Link to="/#" className="flex items-center justify-center border-2 hover:bg-gray-100 hover:border-red-400 hover:border-2 transitions font-bold">
               <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <Link to="#1" className='hover:bg-gray-100 hover:border-red-400 hover:border-2 transitions font-bold'>1</Link>
            <Link to="#2" className='hover:bg-gray-100 hover:border-red-400 hover:border-2 transitions font-bold'>2</Link>
            <Link to="#3" className='hover:bg-gray-100 hover:border-red-400 hover:border-2 transitions font-bold'>3</Link>
            <Link to="#4" className='hover:bg-gray-100 hover:border-red-400 hover:border-2 transitions font-bold'>4</Link>
            <Link to="#5" className='hover:bg-gray-100 hover:border-red-400 hover:border-2 transitions font-bold'>5</Link>
            <Link to="/#" className="flex items-center justify-center border-2 hover:bg-gray-100 hover:border-red-400 hover:border-2 transitions font-bold">
               <i className="fa-solid fa-chevron-right"></i>
            </Link>
         </div>
      </section>
   )
}

export default Pagination