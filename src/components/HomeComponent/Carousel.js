import React, { useCallback, useEffect } from 'react';
import NukaCarousel from 'nuka-carousel';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactStars from 'react-rating-stars-component';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// eslint-disable-next-line import/no-extraneous-dependencies
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { movieList } from '../../store/actions/movieList';

function Carousel() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);

  useEffect(() => {
    dispatch(movieList({ page: 1, limit: 6 }));
  }, [dispatch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      document.querySelector('.carousel__button.left').click();
    } else if (e.key === 'ArrowRight') {
      document.querySelector('.carousel__button.right').click();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return (
    <div className="home__carousel">
      <NukaCarousel
        wrapAround
        renderCenterLeftControls={({ previousSlide }) => (
          <span className="carousel__button left" onClick={previousSlide}>
            ‹
          </span>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <span className="carousel__button right" onClick={nextSlide}>
            ›
          </span>
        )}
        renderBottomCenterControls={null}
      >
        {list?.map((movie) => (
          <div
            key={movie.id}
            className="carousel__block"
            style={{ backgroundImage: `url(http://localhost:4000/${movie.stills[0]?.stillPath})` }}
          >
            <div className="container">
              <div className="carousel__block__slide">
                <div className="carousel__block__slide__img">
                  <img src={`http://localhost:4000/${movie?.photos[0]?.moviePhoto}`} alt="slide" />
                </div>
                <div className="carousel__block__slide__content">
                  <h2>{movie?.title}</h2>
                  <ReactStars
                    className="rating"
                    count={5}
                    size={30}
                    isHalf
                    edit={false}
                    value={movie?.rating}
                    color="white"
                    activeColor="orange"
                  />
                  <p className="carousel__block__slide__content__voters">{`${movie?.voters} Voters`}</p>
                  <div className="carousel__block__slide__content__photo">
                    <Accordion className="accordion">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className="accordion__block"
                      >
                        {movie?.actors?.slice(0, 5)
                          .map((actor) => (
                            <img
                              key={actor.id}
                              src={`http://localhost:4000/${actor.photo}`}
                              alt={`actor${actor.id}`}
                            />
                          ))}
                        <div className="accordion__block__length">
                          <p>{`+${movie.actors.length - 5}`}</p>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {movie?.actors?.slice(5)
                          .map((actor) => (
                            <img
                              key={actor.id}
                              src={`http://localhost:4000/${actor.photo}`}
                              alt={`actor${actor.id}`}
                            />
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="carousel__block__slide__content__button">
                    <NavLink className="green__btn" to={`/film/${movie.id}`}>Watch Trailer</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </NukaCarousel>
    </div>
  );
}

export default Carousel;
