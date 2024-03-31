import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaCircle } from 'react-icons/fa';
import map from '../../assets/images/map.png';
import CardNumber from '../../assets/data/CardNumber';

function CardInput() {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpirationMonthChange = (e) => {
    setExpirationMonth(e.target.value);
  };

  const handleExpirationYearChange = (e) => {
    setExpirationYear(e.target.value);
  };

  return (
    <div className="sign__up__form__card">
      <div className="sign__up__form__card__block">
        <div className="card">
          <img src={map} alt="map" />
          <div className="card__view">
            <p>
              VISA
            </p>
          </div>
          <div className="card__number">
            {CardNumber.map((c) => (
              <span key={c.id}>
                {cardNumber.length > c.length ? cardNumber[c.length] : <FaCircle />}
              </span>
            ))}
          </div>
          <div className="card__owner">
            <div className="card__owner__name">
              {cardName !== '' ? <p>{ cardName }</p> : <p>Name Surname</p>}
            </div>
            <div className="card__owner__date">
              {expirationMonth.length > 0 ? <p>{expirationMonth[0]}</p> : <p>.</p>}
              {expirationMonth.length > 1 ? <p>{expirationMonth[1]}</p> : <p>.</p>}
              <span>/</span>
              {expirationYear.length > 0 ? <p>{expirationYear[0]}</p> : <p>.</p>}
              {expirationYear.length > 1 ? <p>{expirationYear[1]}</p> : <p>.</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="sign__up__form__card__input">
        <div className="sign__up__form__card__input__name">
          <input className="sign__up__input__card" placeholder="Name on Card" type="text" onChange={handleCardNameChange} />
          <input className="sign__up__input__card" placeholder="Card Number" type="text" onChange={handleCardNumberChange} />
        </div>
        <div className="sign__up__form__card__input__date">
          <input placeholder="mm" className="sign__up__input__card__date" type="number" onChange={handleExpirationMonthChange} />
          <span>-</span>
          <input placeholder="yy" className="sign__up__input__card__date" type="number" onChange={handleExpirationYearChange} />
          <span>-</span>
          <input placeholder="CVC" className="sign__up__input__card__date" type="number" />
        </div>
      </div>
    </div>
  );
}

export default CardInput;
