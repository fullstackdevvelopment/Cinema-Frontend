import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NukaCarousel from 'nuka-carousel';
import { easeQuadInOut, easeQuadOut } from 'd3-ease';
import { Alert, Button, Snackbar } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
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

  useEffect(() => {
    dispatch(reviewList(movieId));
  }, [movieId]);

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
      } else if (createReviewResult.error.message === 'Rejected') {
        console.error(createReviewResult.payload.errors);
      }
    } catch (e) {
      setSnackbarMessage(e.message || 'Something went wrong');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }, [commentText, rating, movieId, user, dispatch]);

  const handleRatingChange = useCallback((newRating) => {
    setRating(newRating);
  }, []);
  return (
    <>
      <div className="comments">
        <div className="container">
          <h1 className="comments__header">What People Say</h1>
          <div className="comments__block">
            <NukaCarousel
              slidesToShow={3}
              cellSpacing={20}
              dragging
              slidesToScroll={1}
              wrapAround
              easing={easeQuadInOut}
              edgeEasing={easeQuadOut}
              speed={400}
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
            </NukaCarousel>
          </div>
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
                <ReactStars
                  key={ratingKey}
                  className="rating"
                  count={5}
                  size={30}
                  isHalf
                  value={rating}
                  onChange={handleRatingChange}
                  color="white"
                  activeColor="orange"
                />
              </div>
              <Button onClick={handleCreateComment} className="orange__btn">SEND</Button>
            </div>
          </div>
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
