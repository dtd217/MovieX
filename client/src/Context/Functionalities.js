import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { userAddBookmarkAction, userAddCartAction } from '../Redux/Actions/userActions';

// Check if movie is added to favorites
const CheckIfMovieAddedBookmark = (movie) => {
   const { bookmarks } = useSelector(state => state.userGetBookmarks);
   return bookmarks?.find(bookmark => bookmark?._id === movie?._id);
}

const CheckIfMovieBought = (movie) => {
   const { cart } = useSelector(state => state.userGetCart);
   return cart?.find(m => m?._id === movie?._id);
}

// Add bookmark functionality
const AddBookmark = (movie, dispatch, userInfo) => {
   return !userInfo ?
      toast.error('Đăng nhập để theo dõi phim') :
      dispatch(userAddBookmarkAction({ movieId: movie?._id }));
}

// Add cart functionality
const AddCart = (movie, dispatch, userInfo) => {
   return !userInfo ?
      toast.error('Đăng nhập để thêm phim vào giỏ hàng') :
      dispatch(userAddCartAction({ movieId: movie?._id }));
}

export { CheckIfMovieAddedBookmark, AddBookmark, AddCart, CheckIfMovieBought }