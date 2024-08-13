import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select';
import customStyles from '../helpers/CustomStylesReactSelect';

const options = [
  {
    value: 'date',
    label: 'hour',
  },
];

function Selects() {
  return (
    <div className="ticket__select">
      <Select
        options={options}
        styles={customStyles}
        placeholder="Date"
      />
      <Select
        options={options}
        styles={customStyles}
        placeholder="Hour"
      />
    </div>
  );
}

export default Selects;
