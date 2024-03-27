import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { userAddBookmarkAction } from '../Redux/Actions/userActions';

// Check if movie is added to favorites
const CheckIfMovieAddedBookmark = (movie) => {
   const { bookmarks } = useSelector(state => state.userGetBookmarks);
   return bookmarks.find(bookmark => bookmark?._id === movie?._id);
}

// Add bookmark functionality
const AddBookmark = (movie, dispatch, userInfo) => {
   return !userInfo ?
      toast.error('Đăng nhập để theo dõi phim') :
      dispatch(userAddBookmarkAction({ movieId: movie?._id }));
}

export { CheckIfMovieAddedBookmark, AddBookmark }