import {
   Toaster
} from 'react-hot-toast';

export default function ToastContainer() {
   return (
      <Toaster
         position="top-center"
         reverseOrder={false}
         gutter={8}
         containerStyle={{}}
         toastOptions={{
            duration: 2000,
         }}
      />
   )
}