import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { PulseLoader, RingLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/commons/Wrapper';

function BuyTicketStageFinal() {
  const { stage } = useParams();
  const [stageFinal, setStageFinal] = useState(parseInt(stage, 10) + 1);
  const [loading, setLoading] = useState(false);
  console.log(setStageFinal);
  console.log(setLoading);
  const stageClassName = (stageFinal === 4 ? 'buyTicket__stages__header__block__tickets active two ' : 'buyTicket__stages__header__block__tickets');
  const stageClassNameTwo = (stageFinal === 4 ? 'buyTicket__stages__header__block__tickets active two' : 'buyTicket__stages__header__block__tickets');
  const stageClassNameThree = (stageFinal === 4 ? 'buyTicket__stages__header__block__tickets active two' : 'buyTicket__stages__header__block__tickets');
  return (
    <Wrapper>
      {loading ? (
        <div className="buyTicket__loader">
          <h1>
            Loading
            <PulseLoader color="#E8920B" />
          </h1>
          <RingLoader color="#E8920B" />
        </div>
      ) : (
        <>
          <div className="buyTicket__stages">
            <div className="container">
              <div className="buyTicket__stages__header">
                <div className="buyTicket__stages__header__block">
                  <div className={stageClassName}>
                    <span>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>1. Tickets</p>
                  </div>
                  <span className="buyTicket__stages__header__block__span" />
                  <div className={stageClassNameTwo}>
                    <span>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>2. Seats</p>
                  </div>
                  <span className="buyTicket__stages__header__block__span" />
                  <div className={stageClassNameThree}>
                    <span>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>3. Checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="buyTicket__stages__final">
            <div className="container">
              <div className="buyTicket__stages__final__block">
                <h2>Hooray!</h2>
                <div className="buyTicket__stages__final__block__content">
                  <p>5</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default BuyTicketStageFinal;
