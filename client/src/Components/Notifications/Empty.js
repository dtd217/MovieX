import moment from 'moment'

export const Empty = ({ message }) => {
   return (
      <div className="border-2 border-gray-400 bg-gray-200 rounded-md border-dashed flex flex-col py-4">
         <div className="h-28 flex justify-center items-center">
            <i className="fa-regular fa-circle-xmark fa-4x text-red-500"></i>
         </div>
         <p className="text-xl mx-auto text-center text-gray-700 font-semibold tracking-wide">{message}</p>
      </div>
   )
}

export const DateFormat = (date) => {
   return moment(date).format('DD/MM/YYYY')
}