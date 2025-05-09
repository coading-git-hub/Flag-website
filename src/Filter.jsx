import React, { useState } from 'react';

const Filter = ({ onSearch, onRegionFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    setSelectedRegion(value);
    onRegionFilter(value);
  };

  return (
    <section className='filter'>
      <form className='form-control'>
        <input
          type="search"
          name='search'
          id='search'
          value={searchText}
          onChange={handleSearch}
          placeholder='Search for a Country...'
        />
      </form>

      <div className='filter-region'>
        <select
          name="select"
          id="select"
          className='select'
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="all">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
