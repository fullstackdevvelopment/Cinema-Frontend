import signIn from './signIn';
import register from './register';
import userData from './userData';
import singleMovie from './singleMovie';
import movieList from './movieList';
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

const reducers = {
  signIn,
  register,
  userData,
  singleMovie,
  movieList,
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
};
export default reducers;
