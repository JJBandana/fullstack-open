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
      <Results filteredCountries={filteredCountries} setSearchFilter={setSearchFilter} searchFilter={searchFilter} />
    </div>
  )
}


const Results = ({filteredCountries, setSearchFilter, searchFilter}) => {
  const [weather, setWeather] = useState([])
  useEffect(()=>{
    if(filteredCountries.length === 1){
      console.log('sabemos que filtered countries es igual a 1')
      const params = {access_key: import.meta.env.VITE_APP_API_KEY, query: filteredCountries[0].name}
      axios.get('http://api.weatherstack.com/current', {params}).then(res => {
        console.log(res)
        if(res.data.current){
          console.log('va todo bien')
          const newObj = {
            temp: res.data.current.temperature,
            icon: res.data.current.weather_icons,
            speed: res.data.current.wind_speed,
            dir: res.data.current.wind_dir
          }
          setWeather(newObj)
        }
      })
    }    
  }, [filteredCountries])
  if(filteredCountries.length === 1){
    const country = filteredCountries[0]
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
        <h2>Weather in {country.capital}</h2>
        <p><b>temperature: </b>{weather.temp}°C</p>
        <p><b>wind:</b> {weather.speed} kmh direction {weather.dir}</p>
        <img src={weather.icon} />
      </div>
    )
  }
  if(searchFilter === '') return <div>Write down a Country</div>
  if(filteredCountries.length > 10) return <div>Too many matches, specify another filter</div>

  return filteredCountries.map(data => {
    return(
    <div key={data.name.common}>{data.name.common}<button onClick={() => setSearchFilter(data.name.common)}>show</button></div>
    )})
}

export default App
