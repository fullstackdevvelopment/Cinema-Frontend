import React from 'react';
import map from '../../assets/images/map.png';

function CardInput() {
  return (
    <div className="sign__up__form__card">
      <div className="sign__up__form__card__block">
        <div className="card">
          <img src={map} alt="map" />
          <div className="card__view">
            <p>VISA</p>
          </div>
          <div className="card__number">
            <div>
              <span>o</span>
              <span>o</span>
              <span>o</span>
              <span>o</span>
            </div>
            <div>
              <span>o</span>
              <span>o</span>
              <span>o</span>
              <span>o</span>
            </div>
            <div>
              <span>o</span>
              <span>o</span>
              <span>o</span>
              <span>o</span>
            </div>
            <div>
              <span>o</span>
              <span>o</span>
              <span>o</span>
              <span>o</span>
            </div>
          </div>
          <div className="card__owner">
            <div className="card__owner__name">
              <p>Name</p>
              <p>Surname</p>
            </div>
            <div className="card__owner__date">
              <p>..</p>
              <span>/</span>
              <p>..</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sign__up__form__card__input">
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
    </div>
  );
}

export default CardInput;
