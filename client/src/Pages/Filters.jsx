import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Widget from '../Components/Home/Widget'
// import { Movies } from '../Data/movieData'
import { useDispatch, useSelector } from 'react-redux'
import { typeMovieData, yearData } from '../Data/FilterData'
import { getAllMoviesAction } from '../Redux/Actions/moviesActions'
import toast from 'react-hot-toast'
import ListMovies from '../Components/ListMovies'

const Filters = () => {
   const dispatch = useDispatch()
   const { isError, movies } = useSelector((state) => state.getAllMovies)
   const { categories } = useSelector((state) => state.getAllCategories)

   const [isFilter, setIsFilter] = useState(false)
   const [selectedTypeMovie, setSelectedTypeMovie] = useState(typeMovieData[0].id);
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [selectedYear, setSelectedYear] = useState(yearData[0].id);
   // const [isSelectedSortType, setIsSelectedSortType] = useState("")

   const handleCheckboxChange = (event) => {
      if (event.target.checked) {
         setSelectedCategories((prevSelected) => [...prevSelected, event.target.value]);
      } else {
         setSelectedCategories((prevSelected) =>
            prevSelected.filter((category) => category !== event.target.value)
         );
      }
      setIsFilter(false);
   };

   const handleTypeMovieChange = (event) => {
      setSelectedTypeMovie(event.target.value);
      setIsFilter(false);
   };

   const handleYearChange = (event) => {
      setSelectedYear(event.target.value);
      setIsFilter(false);
   }
   // const resultSortedMovies = (selectedTypeSort) => {
   //    // if (selectedTypeSort === "nameaz") {
   //    //    (Movies.sort((a, b) => (a.title > b.title) ? 1 : -1));
   //    // }
   //    // else if (selectedTypeSort === "nameza") {
   //    //    (Movies.sort((a, b) => (a.title < b.title) ? 1 : -1));
   //    // }
   //    switch (selectedTypeSort) {
   //       case "nameaz":
   //          (Movies.sort((a, b) => {
   //             return (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0;
   //          }));
   //          break;
   //       case "nameza":
   //          (Movies.sort((a, b) => (a.title < b.title) ? 1 : (a.title > b.title) ? -1 : 0));
   //          break;
   //       default:
   //          return Movies
   //    }
   // }

   useEffect(() => {
      dispatch(getAllMoviesAction({
         categories: [...selectedCategories],
         year: selectedYear,
         type: selectedTypeMovie,
         search: '',
      }))
      if (isError) {
         toast.error(isError)
      }
   }, [selectedCategories, selectedTypeMovie, selectedYear, isError, dispatch])

   return (
      <Layout>
         <div className="bg-gray-700 py-4">
            <div className="max-w-6xl p-4 mx-auto bg-black xl:rounded">
               <div className='flex justify-between lg:flex-row flex-col'>
                  <div className='lg:w-3/4 w-full flex flex-col justify-center items-start lg:pr-1 rounded-md h-full'>
                     <div className="bg-gray-200 p-5 rounded-md">
                        <div className="flex md:flex-row flex-col">
                           <div className='md:mr-5 mr-0 w-full md:w-1/5'>
                              <div className="size-fit mb-5 w-full">
                                 <span className='text-xl font-bold text-blue-500'>Sắp xếp theo</span>
                                 <ul className='flex md:flex-col flex-row list-none *:text-gray-700 font-semibold text-sm *:w-fit md:*:w-full flex-wrap *:mt-2 *:mr-2 *:bg-gray-300 rounded-sm overflow-hidden '>
                                    <li>
                                       <button
                                          type='button'
                                          // onClick={setIsSelectedSortType('nameaz')}
                                          className='w-full h-full p-3 text-left hover:bg-gray-600 hover:text-white transitions'>
                                          <i className="fa-solid fa-arrow-down-a-z mr-1"></i>
                                          Tên: A-Z
                                       </button>
                                    </li>
                                    <li>
                                       <button
                                          type='button'
                                          // onClick={resultSortedMovies('nameza')}
                                          className='w-full h-full p-3 text-left hover:bg-gray-600 hover:text-white transitions'>
                                          <i className="fa-solid fa-arrow-down-a-z mr-1"></i>
                                          Tên: Z-A
                                       </button>
                                    </li>
                                    <li>
                                       <button className='w-full h-full p-3 text-left'>
                                          <i className="fa-solid fa-eye mr-1"></i>
                                          Xem nhiều nhất
                                       </button>
                                    </li>
                                    <li>
                                       <button className='w-full h-full p-3 text-left'>
                                          <i className="fa-solid fa-star mr-1"></i>
                                          Bình chọn cao nhất
                                       </button>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           <div className='w-full md:w-4/5 md:pl-5 md:border-l border-gray-300'>
                              {/* Type */}
                              <div className="size-fit mb-5">
                                 <span className='text-xl font-bold text-blue-500'>Loại</span>
                                 <ul className='list-none border border-gray-400 mt-1 font-semibold text-sm flex flex-wrap pb-2.5 px-4 bg-gray-300 rounded-sm overflow-hidden *:mr-5'>
                                    {typeMovieData.map((type, index) => (
                                       <li key={index}>
                                          <label className='text-gray-700 flex items-center mt-2.5'>
                                             <input
                                                type="radio"
                                                value={type.id}
                                                className='mr-2 cursor-pointer border-2'
                                                name='type'
                                                checked={selectedTypeMovie === type.id}
                                                onChange={handleTypeMovieChange}
                                             />
                                             {type.title}
                                          </label>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                              {/* Categories */}
                              <div className="size-fit mb-5">
                                 <span className='text-xl font-bold text-blue-500'>Thể loại</span>
                                 <ul className='list-none border border-gray-400 mt-1 font-semibold text-sm flex flex-wrap pb-2.5 px-4 bg-gray-300 rounded-sm overflow-hidden *:mr-5'>
                                    {categories?.map((category, index) => (
                                       <li key={index}>
                                          <label className='text-gray-700 flex items-center mt-2.5'>
                                             <input
                                                type="checkbox"
                                                value={category.value}
                                                className='mr-2 cursor-pointer border-2'
                                                name='category'
                                                onChange={handleCheckboxChange} />
                                             {category.label}
                                          </label>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                              {/* Year */}
                              <div className="size-fit mb-5">
                                 <span className='text-xl font-bold text-blue-500'>Năm phát hành</span>
                                 <ul className='list-none border border-gray-400 mt-1 font-semibold text-sm flex flex-wrap pb-2.5 px-4 bg-gray-300 rounded-sm overflow-hidden *:mr-5'>
                                    {yearData.map((year, index) => (
                                       <li key={index}>
                                          <label className='text-gray-700 flex items-center mt-2.5'>
                                             <input
                                                type="radio"
                                                value={year.id}
                                                className='mr-2 cursor-pointer border-2'
                                                name='year'
                                                checked={selectedYear === year.id}
                                                onChange={handleYearChange}
                                             />
                                             {year.title}
                                          </label>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className='pt-5 text-center border-t border-gray-300'>
                           <button
                              type='button'
                              className='bg-red-600 lg:mr-8 mr-4 transtions border-0 text-xl font-semibold text-white px-5 py-2.5 rounded hover:bg-gray-600 transitions'
                              onClick={() => { setIsFilter(true) }}>Lọc phim</button>
                           <button
                              type='button'
                              className='bg-red-600 transtions border-0 text-xl font-semibold text-white px-5 py-2.5 rounded hover:bg-gray-600 transitions'
                              onClick={() => {
                                 setIsFilter(false)
                                 // setIsSorted(false)
                              }}>Làm mới</button>
                        </div>
                     </div>

                     {/* List Movies */}
                     {isFilter && movies?.length > 0 &&
                        <div className="text-center w-full">
                           <ListMovies movies={movies} title={"Kết quả tìm kiếm"} />
                        </div>
                     }
                     {/* {resultSortedMovies('nameaz') ?
                        <div className="text-center w-full">
                           <ListMovies movies={resultSortedMovies} title={"Kết quả tìm kiếm"} />
                        </div> :
                        ((<div className={`${resultSortedMovies ? 'hidden' : 'block'} mt-5 rounded-md w-full h-96 bg-red-500`}>
                        </div>))
                     } */}
                  </div>
                  <Widget />
               </div>
            </div>
         </div>
      </Layout >
   )
}

export default Filters