import React from 'react'

const MovieInfo = ({ movie }) => {
   return (
      <>
         <div className="lg:w-1/2 w-full px-4 lg:py-6 pb-0 pt-6">
            <ul className='*:ml-2'>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Thời lượng: </strong>
                  {movie.episode}
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Trạng thái: </strong>
                  {movie.status}
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Thể loại: </strong>
                  {movie.category.join(', ')}
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Đạo diễn: </strong>
                  {movie.director}
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Số người theo dõi: </strong>
                  {movie.followNumber}
               </li>
            </ul>
         </div>
         <div className="lg:w-1/2 w-full px-4 lg:py-6 pt-0 pb-6">
            <ul className='*:ml-2'>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Chất lượng: </strong>
                  <span className='leading-5 mt-1 text-white bg-red-600 px-2.5 py-0.5 text-xs rounded-xl font-semibold'>HD</span>
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Đánh giá: </strong>
                  <span className='leading-5 mt-1 text-white bg-red-700 px-2.5 py-0.5 rounded-sm font-semibold'>{movie.age}</span>
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Ngôn ngữ: </strong>
                  {movie.language}
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Studio: </strong>
                  {movie.studio}
               </li>
               <li className='mb-2 text-[#b5e745]'>
                  <i className="fa-regular fa-circle-dot fa-xs text-[#b5e745]"></i>
                  <strong className='pl-2 text-white'>Năm: </strong>
                  {movie.year[0]}
               </li>
            </ul>
         </div>
      </>
   )
}

export default MovieInfo