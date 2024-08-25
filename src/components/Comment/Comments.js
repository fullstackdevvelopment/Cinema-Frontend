import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'nuka-carousel';
import { Alert, Button, Snackbar } from '@mui/material';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import CommentsBlock from './CommentsBlock';
import { reviewList } from '../../store/actions/reviewList';
import { createReview } from '../../store/actions/createReview';

function Comments(props) {
  const { movieId } = props;
  const dispatch = useDispatch();
  const movieComments = useSelector((state) => state.reviewList.list);
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingKey, setRatingKey] = useState(Date.now());
  const user = useSelector((state) => state.userData.data.user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(reviewList(movieId));
  }, [movieId, dispatch]);

  const handleCreateComment = useCallback(async () => {
    try {
      const userId = user.id;
      const comment = {
        commentText,
        rating,
      };
      const createReviewResult = await dispatch(createReview({ userId, movieId, comment }));
      if (createReview.fulfilled.match(createReviewResult)) {
        setCommentText('');
        setRating(0);
        setRatingKey(Date.now());
        setSnackbarMessage('Thanks for your comment');
        setSnackbarSeverity('success');
      } else {
        console.log(createReviewResult.payload.errors.commentText);
        setSnackbarMessage(createReviewResult.payload.errors.commentText || 'Something went wrong');
        setSnackbarSeverity('error');
      }
    } catch (e) {
      setSnackbarMessage(e.message || 'Something went wrong');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }, [commentText, rating, movieId, user, dispatch]);

  const handleRatingChange = useCallback((event, newRating) => {
    setRating(newRating);
  }, []);

  return (
    <>
      <div className="comments">
        <div className="container">
          <h1 className="comments__header">What People Say</h1>
          <div className="comments__block">
            <Carousel
              cellSpacing={20}
              dragging
              slidesToShow={3}
              speed={400}
              slidesToScroll={1}
              renderBottomCenterControls={null}
              renderCenterLeftControls={({ previousSlide }) => (
                <span onClick={previousSlide}>
                  ‹
                </span>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <span onClick={nextSlide}>
                  ›
                </span>
              )}
            >
              {movieComments?.map((item) => (
                <CommentsBlock
                  key={item.id}
                  comment={item.commentText}
                  userImage={item.users.photo}
                  firstName={item.users.firstName}
                  lastName={item.users.lastName}
                  voters={item.movies.voters}
                  rating={item.rating}
                />
              ))}
            </Carousel>
          </div>
          {token ? (
            <div className="comments__create">
              <h2 className="comments__create__title">Write your comment about the film</h2>
              <div className="comments__create__textarea">
                <textarea
                  name="Your Commnet"
                  id="User Commnet"
                  cols="30"
                  rows="5"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Your Comment"
                />
              </div>
              <div className="comments__create__btn">
                <div className="comments__create__rating">
                  <h2 className="comments__create__rating__title">Select Rating</h2>
                  <Rating
                    key={ratingKey}
                    className="rating"
                    onChange={handleRatingChange}
                    name="simple-controlled"
                    value={rating || 0}
                    precision={0.5}
                    size="small"
                    sx={{ color: '#e8920b' }}
                  />
                </div>
                <Button onClick={handleCreateComment} className="orange__btn">SEND</Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Comments;

Comments.propTypes = {
  movieId: PropTypes.string.isRequired,
};
