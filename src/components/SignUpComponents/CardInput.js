import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import map from '../../assets/images/map.png';
import CardNumber from '../../assets/data/CardNumber';

function CardInput(props) {
  const {
    cardNumber, setCardNumber, cardHolderName, setCardHolderName,
    selectedMonth, setSelectedMonth, selectedYear, setSelectedYear,
    setCvv, cvv, errors,
  } = props;

  const handleCardNameChange = (e) => {
    const { value } = e.target;
    const regex = /^[A-Za-z\s]*$/;

    if (regex.test(value)) {
      setCardHolderName(value);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };

  const handleExpirationMonthChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) {
      setSelectedMonth(value);
    }
  };

  const handleExpirationYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) {
      setSelectedYear(value);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
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
            {CardNumber?.map((c) => (
              <span key={c.id}>
                {cardNumber?.length > c.length ? cardNumber[c?.length] : <FontAwesomeIcon icon={faCircle} />}
              </span>
            ))}
          </div>
          <div className="card__owner">
            <div className="card__owner__name">
              {cardHolderName !== '' ? <p>{ cardHolderName }</p> : <p>Name Surname</p>}
            </div>
            <div className="card__owner__date">
              {selectedMonth?.length > 0 ? <p>{selectedMonth[0]}</p> : <p>.</p>}
              {selectedMonth?.length > 0 ? <p>{selectedMonth[1]}</p> : <p>.</p>}
              <span>/</span>
              {selectedYear?.length > 0 ? <p>{selectedYear[0]}</p> : <p>.</p>}
              {selectedYear?.length > 0 ? <p>{selectedYear[1]}</p> : <p>.</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="sign__up__form__card__input">
        <div className="sign__up__form__card__input__name">
          <label htmlFor="Name on Card">
            <input
              id="Name on Card"
              className="sign__up__input__card"
              placeholder="Name on Card"
              type="text"
              onChange={handleCardNameChange}
              value={cardHolderName}
            />
            {errors && (
              errors.cardHolderName ? (
                <span className="card__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors?.cardHolderName}
                </span>
              ) : (
                <span className="card__ok">
                  <FontAwesomeIcon icon={faCheck} />
                  Everything is written correctly
                </span>
              )
            )}
          </label>
          <label htmlFor="Card Number">
            <input
              id="Card Number"
              className="sign__up__input__card"
              placeholder="Card Number"
              type="text"
              onChange={handleCardNumberChange}
              value={cardNumber}
            />
            {errors && (
              errors.cardNumber ? (
                <span className="card__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors?.cardNumber}
                </span>
              ) : (
                <span className="card__ok">
                  <FontAwesomeIcon icon={faCheck} />
                  Everything is written correctly
                </span>
              )
            )}
          </label>
        </div>
        <div className="sign__up__form__card__input__date">
          <label htmlFor="mm">
            <input
              id="mm"
              placeholder="mm"
              className="sign__up__input__card__date"
              type="text"
              onChange={handleExpirationMonthChange}
              value={selectedMonth}
            />
            {errors && (
              errors.selectedMonth ? (
                <span className="card__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors?.selectedMonth}
                </span>
              ) : (
                <span className="card__ok">
                  <FontAwesomeIcon icon={faCheck} />
                  Correct
                </span>
              )
            )}
          </label>
          <span className="minus__span">-</span>
          <label htmlFor="yy">
            <input
              id="yy"
              placeholder="yy"
              className="sign__up__input__card__date"
              type="text"
              onChange={handleExpirationYearChange}
              value={selectedYear}
            />
            {errors && (
              errors.selectedYear ? (
                <span className="card__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors?.selectedYear}
                </span>
              ) : (
                <span className="card__ok">
                  <FontAwesomeIcon icon={faCheck} />
                  Correct
                </span>
              )
            )}
          </label>
          <span className="minus__span">-</span>
          <label htmlFor="CVC">
            <input
              id="CVC"
              placeholder="CVC"
              className="sign__up__input__card__date"
              type="text"
              onChange={handleCvvChange}
              value={cvv}
            />
            {errors && (
              errors.cvv ? (
                <span className="card__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors?.cvv}
                </span>
              ) : (
                <span className="card__ok">
                  <FontAwesomeIcon icon={faCheck} />
                  Correct
                </span>
              )
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

export default CardInput;
