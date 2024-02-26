import React from 'react'

const Stars = ({ value }) => {
   return (
      <div className='*:mr-1'>
         {value >= 1 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 0.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 2 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 1.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 3 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 2.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 4 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 3.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 5 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 4.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 6 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 5.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 7 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 6.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 8 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 7.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 9 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 8.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
         {value >= 10 ?
            <i className="fa-solid fa-star fa-sm text-yellow-300"></i>
            : value >= 9.5 ?
               <i i className="fa-regular fa-star-half-stroke fa-sm text-yellow-300"></i>
               : <i i className="fa-regular fa-star fa-sm text-yellow-300"></i>
         }
      </div>
   )
}

export default Stars