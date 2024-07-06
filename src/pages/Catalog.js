import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Cart from '../components/HomeComponent/Cart';
import Wrapper from '../components/commons/Wrapper';
import { movieList } from '../store/actions/movieList';
import { categoryList } from '../store/actions/categoryList';

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '20px',
    border: '2px solid rgb(19, 95, 85)',
    padding: '5px 19px',
    color: '#135f55',
    fontSize: '16px',
    width: '182px',
    height: '50px',
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
    background: '#135f55',
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
    color: '#135f55',
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
    backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.7)' : 'rgba(19, 95, 85, 1)',
    borderRadius: '15px',
    boxShadow: '0px 0px 28px 5px rgba(19, 95, 85, 0.85)',
    border: 'none',
    outline: 'none',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0',
    margin: '2px',
  }),
  menuList: (base) => ({
    ...base,
    '::-webkit-scrollbar': {
      width: '20px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: '#135f55',
      borderTopRightRadius: '15px',
      borderBottomRightRadius: '15px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#fff',
      borderRadius: '20px',
      transition: 'all 0.3s',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#0c8575',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#062822 !important',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    padding: '0',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0',
  }),
  input: (provided) => ({
    ...provided,
    color: '#062822 !important',
  }),
};

function Catalog() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);
  const category = useSelector((state) => state.categoryList.list);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(movieList({ page: 1, limit: 6 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const categoryOptions = category.map((cat) => ({
    label: cat.name,
    value: cat.name,
  }));

  const filteredListByCategory = selectedCategories.reduce((acc, cat) => acc.filter(
    (movie) => movie.categories.some((movieCategory) => movieCategory.name === cat.value),
  ), list);

  const filteredListByTitle = filteredListByCategory.filter(
    (movie) => movie.title.toLowerCase().includes(inputValue.toLowerCase()),
  );

  console.log(filteredListByTitle);

  return (
    <Wrapper className="cinema__home">
      <div className="filtration">
        <div className="container">
          <div className="filtration__block">
            <div className="filtration__block__select">
              <Select
                options={categoryOptions}
                isMulti
                styles={customStyles}
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Category"
                onChange={handleCategoryChange}
              />
              <Select
                isMulti
                styles={customStyles}
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Country"
              />
              <Select
                isMulti
                styles={customStyles}
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Year"
              />
            </div>
            <div className="filtration__block__search">
              <input
                className="sign__in__input"
                type="text"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>
      </div>
      <div className="cinema__home__latest">
        <div className="container">
          <div className="cinema__home__latest__row">
            {filteredListByTitle?.map((movie) => (
              <Cart
                key={movie.id}
                moviePhoto={movie.photos[0].moviePhoto}
                title={movie.title}
                rating={movie.rating}
                voters={movie.voters}
                movieId={movie.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Catalog;
