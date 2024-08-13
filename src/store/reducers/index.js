import signIn from './signIn';
import register from './register';
import userData from './userData';
import singleMovie from './singleMovie';
import categoryList from './categoryList';
import countryList from './countryList';
import scheduleList from './scheduleList';
import reviewList from './reviewList';
import payment from './payment';
import createReview from './createReview';
import createBooking from './createBooking';
import sendMessage from './sendMessage';
import emailVerification from './emailVerification';
import resetPassword from './resetPassword';
import resetPasswordFinished from './resetPasswordFinished';
import uploadTicket from './uploadTicket';
import userUpdate from './userUpdate';
import filteredMovieList from './filteredMovieList';
import movieList from './movieList';

const reducers = {
  signIn,
  register,
  userData,
  singleMovie,
  filteredMovieList,
  categoryList,
  countryList,
  scheduleList,
  reviewList,
  payment,
  createReview,
  createBooking,
  sendMessage,
  emailVerification,
  resetPassword,
  resetPasswordFinished,
  uploadTicket,
  userUpdate,
  movieList,
};
export default reducers;
