import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select';

const options = [
  {
    value: 'date',
    label: 'hour',
  },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: '#000000',
    borderRadius: '20px',
    border: '2px black',
    padding: '5px 19px',
    marginRight: '10px',
    color: '#ffffff',
    fontSize: '16px',
    width: '585px',
    height: '60px',
    fontWeight: '600',
    lineHeight: '21.09px',
    '&:focus': {
      ...provided[':focus'],
      color: '#fff',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
    '&:hover': {
      ...provided[':hover'],
      outline: 'none',
      boxShadow: 'none',
    },
    '&:focus-visible': {
      ...provided[':focus-visible'],
      outline: 'none',
      boxShadow: 'none',
    },
  }),
  option: (provided) => ({
    ...provided,
    background: '#000000',
    color: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    borderRadius: '15px',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '21.09px',
    width: '100%',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#135f55',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#135f55',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#ffffff',
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '21.09px',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: '0',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#135f55 !important',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'rgb(0,0,0)' : 'rgb(0,0,0)',
    borderRadius: '15px',
    border: 'none',
    outline: 'none',
    display: 'flex',
    width: '98%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0',
    margin: '2px',
  }),
};

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
