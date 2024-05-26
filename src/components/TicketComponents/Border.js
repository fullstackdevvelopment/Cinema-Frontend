import React from 'react';

function Border() {
  return (
    <div className="border__box">
      <div className="border" />
      <div className="border__hour">10:30 am</div>
      <div className="border" />
      <div className="border__hour">16:00 pm</div>
      <div className="border" />
      <div className="border__hour">21:00 pm</div>
      <div className="border" />
    </div>
  );
}

export default Border;
