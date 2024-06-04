import React from 'react';
import Selects from '../../components/Selects';
import Wrapper from '../../components/commons/Wrapper';
import bgImage from '../../assets/images/ticketPhoto/backgroundImage.png';
import ticketImg from '../../assets/images/ticketPhoto/ticketImg.png';

function BuyTicket1() {
  return (
    <Wrapper>
      <div className="buyTicket">
        <div className="buyTicket__block" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="container">
            <div className="buyTicket__block__item">
              <div className="buyTicket__block__item__img">
                <img src={ticketImg} alt="slide" />
              </div>
              <div className="buyTicket__block__item__desc">
                <h2>One The Page</h2>
                <p>2h 13 moin</p>
                <div className="buyTicket__block__item__desc__main">
                  <h1>
                    Lorem ipsum dolor sit amet, consectetur aatur, suscipit.
                    dolor sit amet, consecteturLorem ipsum dolor sit amet,
                    dolor sit amet, consecteturcteturLorem ipsum dolor sit ame
                    dolor sit amet, consectetur
                  </h1>
                </div>
                <div className="buyTicket__block__item__desc__foot">
                  <h1>Fmovie cinema</h1>
                </div>
              </div>
            </div>
            <Selects />
            {/* eslint-disable-next-line react/button-has-type */}
            <div className="buyTicket__button">
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="orange__btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default BuyTicket1;
