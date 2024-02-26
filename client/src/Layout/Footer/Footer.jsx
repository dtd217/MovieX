import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
   return (
      <>
         <nav className="bg-black">
            <div className="max-w-screen-xl flex flex-wrap flex-col items-center justify-center mx-auto py-10 px-8">
               <Link to="/" className="flex justify-center items-center">
                  <span className="self-center text-3xl lg:text-4xl font-semibold whitespace-nowrap tracking-wide text-red-600">MovieX</span>
               </Link>
               <p className="my-6 text-center text-base lg:text-lg text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor incididunt dolore.</p>
               <ul className="grid grid-cols-2 gap-x-3 sm:flex sm:flex-row justify-center items-center mb-6 text-white">
                  <li>
                     <Link to="#" className="mr-4 hover:underline sm:mr-6">About</Link>
                  </li>
                  <li>
                     <Link to="#" className="mr-4 hover:underline sm:mr-6">Premium</Link>
                  </li>
                  <li>
                     <Link to="#" className="mr-4 hover:underline sm:mr-6">Blog</Link>
                  </li>
                  <li>
                     <Link to="#" className="mr-4 hover:underline sm:mr-6 ">Licensing</Link>
                  </li>
                  <li>
                     <Link to="#" className="mr-4 hover:underline sm:mr-6">FAQs</Link>
                  </li>
                  <li>
                     <Link to="#" className="mr-4 hover:underline sm:mr-6">Contact</Link>
                  </li>
               </ul>
               <span className="text-base text-center text-gray-400">© 2023-2024 <Link to="#" className="hover:underline hover:text-red-400">MovieX</Link>. All Rights Reserved.</span>
            </div>
         </nav>
      </>
   )
}

export default Footer