import '../styles/App.css'
import '../styles/Map.css'
import { useState } from 'react'
import Header from './Header';
import Location from './location';
import Deparr from './Deparr';
import Register from './Register';
import {r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11} from './Regex';


function App() {
  const [search, setSearch] = useState()
  const [flnum, setFlnum] = useState()
  const [airport, setAirport] = useState()
	const handleQueryChange = (e) => {
    e.preventDefault()
		setSearch(e.target.value)
	}
  const handleSubmit = (e) => {
    e.preventDefault()
    if(r1.test(search) | r2.test(search) | r3.test(search) | r4.test(search) | r5.test(search) | r6.test(search) | r7.test(search) |
       r8.test(search) | r9.test(search) | r10.test(search)) {
      setFlnum(search)
    } else if(r11.test(search)){
      setAirport(search)
    } else alert(`${search} is not a valid search. Use a Flight Number, or Airport Abbreviation.`)
  }
  return (
    <>
      <Header className='xd' handleQueryChange={handleQueryChange} handleSubmit={handleSubmit}/>
      <Location query={flnum}/>
      <Deparr query={airport}/>
      <Register />
    </>
  );
}

export default App;
