import { FadeLoader } from 'react-spinners'

function Loader() {
   return (
      <div className="w-full px-2 py-4 flex items-center justify-center">
         <FadeLoader color="#EF4444" />
      </div>
   )
}

export default Loader