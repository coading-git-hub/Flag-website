import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import { Link } from 'react-router-dom';
const url = 'https://restcountries.com/v3.1/all';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 8;

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountryData();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchText.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [searchText, selectedRegion, countries]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
  };

  // const removeCountry = (cca3) => {
  //   const updatedCountries = countries.filter((country) => country.cca3 !== cca3);
  //   setCountries(updatedCountries);
  // }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationNumbers = () => {
    const numbers = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        numbers.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        numbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        numbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    
    return numbers;
  };

  return (
    <>
      <Filter onSearch={handleSearch} onRegionFilter={handleRegionFilter} />
      <section className='grid'>
        {currentCountries.map((country) => {
          const { cca3, name, flags } = country;

          return (
            <article key={cca3} className="country-card">
              <div className="card-content">
                <div className="flag-container">
                  <img src={flags.png} alt={name.common} />
                </div>
                <div className="card-footer">
                  <h2>{name.common}</h2>
                  <div className="button-group">
                    <Link to={`/Countries/${name.common}`} className="btn btn-primary">
                      <i className="fas fa-info-circle"></i> Learn More
                    </Link>
                    {/* <button className='btn btn-danger' onClick={() => removeCountry(cca3)}>
                      <i className="fas fa-trash"></i> Remove
                    </button> */}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i> Previous
          </button>
          
          {getPaginationNumbers().map((number) => (
            <button
              key={number}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          
          <button 
            className="pagination-btn" 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Countries;
