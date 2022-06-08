import '../styles/App.css'
import '../styles/Map.css'
import { useState } from 'react'
import Header from './Header';
import Location from './location';
import Deparr from './Deparr';
import {r1, r2, r3, r4, r5, r6, r7} from './Regex';


function App(props) {
  const [search, setSearch] = useState()
  const [flnum, setFlnum] = useState()
  const [airport, setAirport] = useState()
	const handleQueryChange = (e) => {
    e.preventDefault()
		setSearch(e.target.value)
	}
  const handleSubmit = (e) => {
    e.preventDefault()
    if(r1.test(search) | r2.test(search) | r3.test(search) | r4.test(search) | r5.test(search) | r6.test(search)) {
      setFlnum(search)
    } else if(r7.test(search)){
      setAirport(search)
    } else alert(`${search} is not a valid search. Use a Flight Number, or Airport Abbreviation.`)
  }
  return (
    <>
      <Header className='xd' handleQueryChange={handleQueryChange} handleSubmit={handleSubmit}/>
      <Location query={flnum}/>
      <Deparr query={airport}/>
    </>
  );
}

export default App;
