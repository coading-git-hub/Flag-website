import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const Country = () => {
    const [country, setCountry] = useState([])
    const [error, setError] = useState(null)
    const { name } = useParams()

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
                if (!response.ok) {
                    throw new Error('Failed to fetch country data')
                }
                const data = await response.json()
                setCountry(data)
            } catch (error) {
                setError(error.message)
                console.error('Error fetching country:', error)
            }
        }
        fetchCountryData()
    }, [name])

    if (error) {
        return (
            <div className="error">
                <Link to='/' className='btn btn-light'>
                    <i className='fas fa-arrow-left'></i>Back Home
                </Link>
                <h2>Error: {error}</h2>
            </div>
        )
    }

    return (
        <>
            <Link to='/' className='btn btn-light'>
                <i className='fas fa-arrow-left'></i>Back Home
            </Link>
            <section className='country'>
                {country.map((item) => {
                    const { cca3, flags, name, population, region, subregion, capital, tld, borders,
                        currencies, languages } = item
                    return (
                        <article key={cca3}>
                            <div className='flag'>
                                <img src={flags.png} alt={name.common} height={450}/>
                            </div>
                            <div className='country-details'>
                                <h2>{name.common}</h2>
                                <h4>Population: <span>{population.toLocaleString()}</span></h4>
                                <h4>Region: <span>{region}</span></h4>
                                <h4>Subregion: <span>{subregion}</span></h4>
                                <h4>Capital: <span>{capital ? capital[0] : 'N/A'}</span></h4>
                                <h4>Top Level Domain: <span>{tld ? tld[0] : 'N/A'}</span></h4>
                                <h4>Languages: <span>{languages ? Object.values(languages).join(", ") : "N/A"}</span></h4>
                                <h4>Currencies: <span>{currencies ? Object.values(currencies).map(c => c.name).join(", ") : "N/A"}</span></h4>
                                <h4>Border Countries: <span>{borders ? borders.join(", ") : "N/A"}</span></h4>
                            </div>
                        </article>
                    )
                })}
            </section>
        </>
    )
}

export default Country
