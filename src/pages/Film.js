import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader, RingLoader } from 'react-spinners';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import NukaCarousel from 'nuka-carousel';
import { easeQuadInOut, easeQuadOut } from 'd3-ease';
import Stars from '../components/HomeComponent/Stars';
import Wrapper from '../components/commons/Wrapper';
import Comments from '../components/Comment/Comments';
import { singleMovie } from '../store/actions/singleMovie';

function Film() {
  const { movieId } = useParams();
  const navigate = useNavigate();
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

  const handleClick = useCallback(() => {
    navigate(`/ticket/buy/${movieId}`);
  }, []);

  return (
    <Wrapper>
      <div className="film">
        {loading ? (
          <div className="buyTicket__loader">
            <h1>
              Loading
              <PulseLoader color="#E8920B" />
            </h1>
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
                    renderBottomCenterControls={null}
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
            <div className="details__card">
              <div className="details__title">
                <div className="details__title__text">
                  <h2>Details</h2>
                </div>
                <div className="details__title__text">
                  <h2>Storyline</h2>
                </div>
              </div>
              <div className="details">
                <div className="details__content">
                  <div className="details__content__text">
                    <p>Details:</p>
                    {singleData?.details}
                  </div>
                  <div className="details__content__text">
                    <p>Language:</p>
                    {singleData?.language}
                  </div>
                  <div className="details__content__text">
                    <p>Release Date:</p>
                    {singleData?.releaseDate}
                  </div>
                  <div className="details__content__text">
                    <p>Director:</p>
                    {singleData?.director}
                  </div>
                </div>
              </div>
              <div className="storyline">
                <p>
                  {singleData?.storyLine}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="film__btn" onClick={handleClick}>
          <button type="submit" className="orange__btn">Get Tickets</button>
        </div>
        <Comments movieId={movieId} />
      </div>
    </Wrapper>
  );
}

export default Film;
