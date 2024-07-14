import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RingLoader } from 'react-spinners';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
// eslint-disable-next-line import/no-extraneous-dependencies
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import NukaCarousel from 'nuka-carousel';
// eslint-disable-next-line import/no-extraneous-dependencies
import { easeQuadInOut, easeQuadOut } from 'd3-ease';
import Stars from '../components/HomeComponent/Stars';
import Wrapper from '../components/commons/Wrapper';
import Comments from '../components/Comment/Comments';
import { singleMovie } from '../store/actions/singleMovie';

function Film() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const singleData = useSelector((state) => state.singleMovie.list);

  useEffect(() => {
    if (movieId) {
      (async () => {
        setLoading(true);
        await dispatch(singleMovie(movieId));
        setLoading(false);
      })();
    }
  }, [movieId, dispatch]);

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
    <Wrapper>
      <div className="film">
        {loading ? (
          <div className="admin__dashboard__loader">
            <RingLoader color="#E8920B" />
          </div>
        ) : (
          <div className="container">
            <div className="film__stars">
              <h2 className="film__title">On the Edge</h2>
              <div className="film__stars__content">
                <Stars rating={singleData?.rating} />
                <p>{`${singleData?.voters} Voters`}</p>
              </div>
            </div>
            <div className="film__box">
              <figure className="film__box__image">
                <img src={`http://localhost:4000/${singleData?.photos[0]?.moviePhoto}`} alt="movie" />
                <div className="film__box__users">
                  <Accordion className="accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className="accordion__block"
                    >
                      {singleData?.actors?.slice(0, 5)
                        .map((user) => (
                          <figure key={user.id} className="film__box__users__item">
                            <img src={`http://localhost:4000/${user.photo}`} alt="user" />
                          </figure>
                        ))}
                      <div className="accordion__block__length">
                        {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                        <p>{`+${singleData.actors?.length - 5}`}</p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {singleData?.actors?.slice(5)
                        .map((user) => (
                          <figure key={user.id} className="film__box__users__item">
                            <img src={`http://localhost:4000/${user.photo}`} alt="user" />
                          </figure>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </div>
              </figure>
              <div className="film__box__movie">
                <video controls width="700">
                  <track kind="captions" />
                  <source
                    className="film__box__movie__video"
                    src={`http://localhost:4000/${singleData?.trailers[0].trailer}`}
                    type="video/mp4"
                  />
                </video>
                <div className="film__box__movie__shots">
                  <NukaCarousel
                    wrapAround
                    slidesToShow={3}
                    easing={easeQuadInOut}
                    edgeEasing={easeQuadOut}
                    speed={400}
                    slidesToScroll={1}
                    cellSpacing={10}
                    renderCenterLeftControls={({ previousSlide }) => (
                      <span className="film carousel__button left" onClick={previousSlide}>
                        ‹
                      </span>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                      <span className="film carousel__button right" onClick={nextSlide}>
                        ›
                      </span>
                    )}
                    renderBottomCenterControls={null}
                  >
                    {singleData?.stills?.map((s) => (
                      <div key={s.id} className="film__box__movie__shots__block">
                        <figure className="film__box__movie__shots__item">
                          <img src={`http://localhost:4000/${s.stillPath}`} alt="shot" />
                        </figure>
                      </div>
                    ))}
                  </NukaCarousel>
                </div>
              </div>
            </div>
            <div className="details-card">
              <div className="details">
                <h2>Details</h2>
                <div className="details__card__line" />
                <div className="details-content">
                  <div>
                    <strong>Details:</strong>
                    {singleData?.details}
                  </div>
                  <div className="details__card__line" />
                  <div>
                    <strong>Language:</strong>
                    {singleData?.language}
                  </div>
                  <div className="details__card__line" />
                  <div>
                    <strong>Release Date:</strong>
                    {singleData?.releaseDate}
                  </div>
                  <div className="details__card__line" />
                  <div>
                    <strong>Director:</strong>
                    {singleData?.director}
                  </div>
                  <div className="details__card__line" />
                </div>
              </div>
              <div className="storyline">
                <h2>Storyline</h2>
                <div className="details__card__line" />
                <p>
                  {singleData?.storyLine}
                </p>
              </div>
            </div>
          </div>
        )}
        <Comments />
      </div>
    </Wrapper>
  );
}

export default Film;
