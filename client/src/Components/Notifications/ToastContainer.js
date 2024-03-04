import {
   Toaster
} from 'react-hot-toast';

export default function ToastContainer() {
   return (
      <Toaster
         position="top-right"
         reverseOrder={false}
         gutter={8}
         containerStyle={{}}
         toastOptions={{
            duration: 2000,
         }}
      />
   )
}