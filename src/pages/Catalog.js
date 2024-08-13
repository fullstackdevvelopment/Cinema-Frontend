import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PulseLoader, RingLoader } from 'react-spinners';
import Cart from '../components/HomeComponent/Cart';
import Wrapper from '../components/commons/Wrapper';
import { categoryList } from '../store/actions/categoryList';
import { countryList } from '../store/actions/countryList';
import Pagination from '../helpers/Pagination';
import customStyles from '../helpers/CustomStylesReactSelect';
import { filteredMovieList } from '../store/actions/filteredMovieList';

function Catalog() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.filteredMovieList.list);
  const totalPages = useSelector((state) => state.filteredMovieList.totalPages);
  const countries = useSelector((state) => state.countryList.list);
  const category = useSelector((state) => state.categoryList.list);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(categoryList());
    dispatch(countryList());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(filteredMovieList({
        page: currentPage,
        limit: 9,
        title: inputValue,
        categoryIds: selectedCategories.map((cat) => cat.value),
        countries: selectedCountries.map((country) => country.value),
        years: selectedYears.map((year) => year.value),
      }));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, currentPage, inputValue, selectedCategories, selectedCountries, selectedYears]);

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
    value: cat.id,
  }));

  const countryOptions = countries?.map((count) => ({
    label: count,
    value: count,
  }));

  const yearOptions = Array.from(new Set(
    list?.map((movie) => new Date(movie.releaseDate).getFullYear()),
  ))
    .sort()
    .map((year) => ({
      label: year.toString(),
      value: year.toString(),
    }));

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const startIndex = (currentPage - 1) * 9;
  const endIndex = startIndex + 9;

  const paginatedList = list?.length > 9 ? list.slice(startIndex, endIndex) : list;

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
      {loading ? (
        <div className="buyTicket__loader">
          <h1>
            Loading
            <PulseLoader color="#E8920B" />
          </h1>
          <RingLoader color="#E8920B" />
        </div>
      ) : (
        <div className="cinema__home__latest">
          <div className="container">
            <div className="cinema__home__latest__row">
              {paginatedList ? paginatedList?.map((movie) => (
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
      )}
    </Wrapper>
  );
}

export default Catalog;
