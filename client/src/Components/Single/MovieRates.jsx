import React, { useState } from 'react'
import Stars from '../Stars';
import { UsersData } from '../../Data/usersData';

const MovieRates = () => {
   const getTimeDifference = () => {
      const currentDate = new Date();
      const desiredDate = new Date("2024-01-12 15:00:00");

      const timeDifference = desiredDate.getTime() - currentDate.getTime();
      const millisecondsInHour = 1000 * 60 * 60;
      const millisecondsInDay = millisecondsInHour * 24;

      const daysDifference = Math.floor(timeDifference / millisecondsInDay);
      const hoursDifference = Math.floor(timeDifference / millisecondsInHour);

      const result = timeDifference > millisecondsInDay ? `${daysDifference} days ago` : `${hoursDifference} hours ago`
      return currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, day: 'numeric', month: 'long', year: 'numeric' })
      // return result
   }

   const [rating, setRating] = useState(0);

   const Rating = [
      { title: '0 - Poor', value: 0 },
      { title: '1 - Terrible', value: 1 },
      { title: '2 - Very Bad', value: 2 },
      { title: '3 - Bad', value: 3 },
      { title: '4 - Not Good', value: 4 },
      { title: '5 - Decent', value: 5 },
      { title: '6 - Ok', value: 6 },
      { title: '7 - Good', value: 7 },
      { title: '8 - Great', value: 8 },
      { title: '9 - Fantastic', value: 9 },
      { title: '10 - Favourite', value: 10 },
   ]

   return (
      <div className='size-full text-black'>
         <h1 className='text-4xl font-bold mb-4'>Reviews (34)</h1>
         <div className='flex flex-col'>
            <h2 className='text-lg mb-0.5'>Select Rating</h2>
            <select
               onChange={e => setRating(e.target.value)}
               options={Rating}
               className='w-full md:w-1/3 text-sm'
            >
               {Rating.map((item, index) => (
                  <option key={index} value={item.value}>{item.title}</option>
               ))}
            </select>
            <div className="mt-2 xs:text-2xl">
               <Stars value={rating} />
            </div>
            <form action="">
               <textarea placeholder='Write your review' className='w-full resize-none mt-2 h-28'></textarea>
               <button className='rounded-md mt-2 transitions hover:bg-gray-600 bg-red-600 text-lg font-semibold text-white px-4 py-3'>
                  Submit Review
               </button>
            </form>
         </div>
         <div className="mt-5 border-t-2 border-gray-300">
            {UsersData?.slice(5, 10).map((user, index) => (
               <div key={index} className="pt-6">
                  <div className="flex">
                     <img src={user?.avatar} alt="user-avatar" className='rounded-md size-12 bg-gradient-to-t from-red-700 to-red-900' />
                     <div className="ml-4">
                        <h4 className='text-lg font-semibold'>{user?.name}</h4>
                        <p className='text-sm text-gray-500'>{getTimeDifference()}</p>
                        <div className=""><Stars value={user?.rating} /></div>
                     </div>
                  </div>
                  <div className="mt-1 ml-16">
                     <p className='italic text-gray-700 text-sm xs:text-base'>{user?.review}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default MovieRates