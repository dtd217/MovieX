import { useRef, useState } from "react";

export const ImagePreview = ({ image, name, type }) => {
   const videoRef = useRef(null);
   const [isPlayed, setIsPlayed] = useState(false)

   return (
      <>
         {type === "user" ?
            <div className="size-32 mt-2 flex justify-center p-2 border-2 border-gray-400 mx-auto rounded-md">
               {/* <img src="https://i.pravatar.cc" className="w-32 rounded-md" alt='profile' /> */}
               <img src={image ? image : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} className="w-32 rounded-md object-contain" alt={name} />
            </div>
            : type === "movie" ?
               <div div className="mt-2 flex justify-center p-2 border-2 border-gray-400 mx-auto rounded-md">
                  {/* <img src="https://i.pravatar.cc" className="w-32 rounded-md" alt='profile' /> */}
                  <img src={image ? image : '/images/movie-default.jpg'} className="w-32 rounded-md object-contain bg-transparent" alt={name} />
               </div >
               : type === "video" ?
                  <div className="mt-5 self-center">
                     {image ?
                        <video
                           ref={videoRef}
                           controls
                           poster='/images/bgBlack.png'
                           playsInline
                           controlsList="nodownload"
                           className='rounded-md max-w-md w-full'
                           src={image}
                           onPause={() => setIsPlayed(false)}
                        ></video>
                        : <img src={'/images/video-default.png'} className="w-80 rounded-md border-2 border-gray-600" alt={name} />
                     }

                  </div>
                  : <></>
         }
      </>
   )
}