import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PulseLoader, RingLoader } from 'react-spinners';
import Cart from '../components/HomeComponent/Cart';
import Wrapper from '../components/commons/Wrapper';
import { movieList } from '../store/actions/movieList';
import { categoryList } from '../store/actions/categoryList';
import { countryList } from '../store/actions/countryList';
import Pagination from '../helpers/Pagination';

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '20px',
    border: '2px solid #135f55',
    padding: '5px 19px',
    color: '#135f55',
    fontSize: '16px',
    width: '100%',
    fontWeight: '600',
    lineHeight: '21.09px',
    outline: 'none',
    boxShadow: 'none',
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
  multiValue: (provided) => ({
    ...provided,
    background: '#135f55 !important',
    borderRadius: '15px',
    color: '#fff',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff !important',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff !important',
    transition: 'all 0.3s',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
    cursor: 'pointer',
    '&:hover': {
      ...provided[':hover'],
      outline: 'none',
      boxShadow: 'none',
      backgroundColor: '#1c796d !important',
    },
  }),
};

function Catalog() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);
  const countries = useSelector((state) => state.countryList.list);
  const category = useSelector((state) => state.categoryList.list);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatch(movieList({ page: 1, limit: 6 }));
      dispatch(countryList());
      dispatch(categoryList());
      setLoading(false);
    })();
  }, [dispatch]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions || []);
  };

  const handleYearChange = (selectedOptions) => {
    setSelectedYears(selectedOptions || []);
  };

  const categoryOptions = category?.map((cat) => ({
    label: cat.name,
    value: cat.name,
  }));

  const countryOptions = countries?.map((count) => ({
    label: count,
    value: count,
  }));

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const yearOptions = Array.from(new Set(
    list?.map((movie) => new Date(movie.releaseDate).getFullYear()),
  ))
    .sort()
    .map((year) => ({
      label: year.toString(),
      value: year.toString(),
    }));

  const filteredListByCategory = selectedCategories.length
    ? list?.filter(
      (movie) => selectedCategories.some(
        (cat) => movie.categories.some((movieCategory) => movieCategory.name === cat.value),
      ),
    )
    : list;

  const filteredListByCountry = selectedCountries.length
    ? filteredListByCategory?.filter(
      (movie) => selectedCountries.some((country) => movie.details.includes(country.value)),
    )
    : filteredListByCategory;

  const filteredListByYear = selectedYears.length
    ? filteredListByCountry?.filter(
      (movie) => selectedYears.some(
        (year) => new Date(movie.releaseDate).getFullYear().toString() === year.value,
      ),
    )
    : filteredListByCountry;

  const filteredListByTitle = filteredListByYear?.filter(
    (movie) => movie.title.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const count = filteredListByTitle?.length;
  const totalPages = Math.ceil(count / 12);
  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;

  const paginatedList = filteredListByTitle?.slice(startIndex, endIndex);

  return (
    <Wrapper className="cinema__home">
      {loading ? (
        <div className="buyTicket__loader">
          <h1>
            Loading
            <PulseLoader color="#E8920B" />
          </h1>
          <RingLoader color="#E8920B" />
        </div>
      ) : (
        <>
          <div className="filtration">
            <div className="container">
              <div className="filtration__block">
                <div className="filtration__block__select">
                  <Select
                    options={categoryOptions}
                    isMulti
                    styles={customStyles}
                    name="categories"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Category"
                    onChange={handleCategoryChange}
                  />
                  <Select
                    options={countryOptions}
                    isMulti
                    styles={customStyles}
                    name="countries"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Country"
                    onChange={handleCountryChange}
                  />
                  <Select
                    options={yearOptions}
                    isMulti
                    styles={customStyles}
                    name="years"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Year"
                    onChange={handleYearChange}
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
                {paginatedList ? paginatedList.map((movie) => (
                  <Cart
                    key={movie.id}
                    moviePhoto={movie.photos[0].moviePhoto}
                    title={movie.title}
                    rating={movie.rating}
                    voters={movie.voters}
                    movieId={movie.id}
                  />
                )) : null}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default Catalog;
