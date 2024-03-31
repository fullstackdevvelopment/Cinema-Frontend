import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CartHeader(props) {
  const { name } = props;
  return (
    <div className="cinema__home__latest__header">
      <div className="container">
        <div className="cinema__home__latest__header__title">
          <span className="cinema__home__latest__header__title__item">{name}</span>
          <FontAwesomeIcon icon={faChevronRight} className="cinema__home__latest__header__icone" />
        </div>
      </div>

    </div>
  );
}

export default CartHeader;
