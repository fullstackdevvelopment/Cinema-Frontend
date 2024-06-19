import React from 'react';
import { FaCircle } from 'react-icons/fa';
import map from '../../assets/images/map.png';
import CardNumber from '../../assets/data/CardNumber';

function CardInput(props) {
  const {
    cardNumber, setCardNumber, cardHolderName, setCardHolderName,
    selectedMonth, setSelectedMonth, selectedYear, setSelectedYear,
    setCvv,
  } = props;

  const handleCardNameChange = (e) => {
    setCardHolderName(e.target.value);
  };
  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpirationMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleExpirationYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
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
              {cardHolderName !== '' ? <p>{ cardHolderName }</p> : <p>Name Surname</p>}
            </div>
            <div className="card__owner__date">
              {selectedMonth.length > 0 ? <p>{selectedMonth[0]}</p> : <p>.</p>}
              {selectedMonth.length > 0 ? <p>{selectedMonth[1]}</p> : <p>.</p>}
              <span>/</span>
              {selectedYear.length > 0 ? <p>{selectedYear[0]}</p> : <p>.</p>}
              {selectedYear.length > 0 ? <p>{selectedYear[1]}</p> : <p>.</p>}
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
          <input placeholder="CVC" className="sign__up__input__card__date" type="number" onChange={handleCvvChange} />
        </div>
      </div>
    </div>
  );
}

export default CardInput;
