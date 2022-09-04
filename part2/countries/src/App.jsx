import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [searchFilter, setSearchFilter] = useState('')
  const [countries, setCountries] = useState([])

  const filteredCountries = countries.filter(item => item.name.common.toLowerCase().includes(searchFilter.toLowerCase()))

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountries(res.data)
    })
  }, [])

  return (
    <div className="App">
      find countries <input value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
      <Results filteredCountries={filteredCountries} setSearchFilter={setSearchFilter} />
    </div>
  )
}

/*
const CountryInfo = ({country}) => (
  
)
*/

const Results = ({filteredCountries, setSearchFilter}) => {
  if(filteredCountries.length > 10) return <div>Too many matches, specify another filter</div>
  if(filteredCountries.length === 1){
    const country = filteredCountries[0];
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.keys(country.languages).map((key) => <li key={key}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.svg} width='150px'/>
      </div>
    )
  }
  return filteredCountries.map(data => {
    return(
    <div key={data.name.common}>{data.name.common}<button onClick={() => setSearchFilter(data.name.common)}>show</button></div>
    )})
}

export default App
