import React from 'react';

function Test() {
  return (
    <div>
      <div style={{ margin: 10 }}>
        <button type="submit" className="orange__btn">Sign Up</button>
      </div>
      <div style={{ margin: 10 }}>
        <button type="submit" className="green__btn">Tickets</button>
      </div>
      <div style={{ margin: 10 }}>
        <button type="submit" className="empty__btn">Cancel</button>
      </div>
      <div style={{ margin: 100 }}>
        <input placeholder="Username" className="sign__in__input" type="text" />
      </div>
      <div style={{ margin: 100 }}>
        <input placeholder="Adress" className="sign__up__input" type="text" />
      </div>
      <div style={{ margin: 100 }}>
        <input placeholder="Name on Card" className="sign__up__input__card" type="text" />
      </div>
      <div style={{ margin: 100 }}>
        <input placeholder="mm" className="sign__up__input__card__date" type="number" />
      </div>
    </div>
  );
}

export default Test;
