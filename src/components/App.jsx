import '../styles/App.css'
import '../styles/Map.css'
import { useState } from 'react'
import Header from './Header';
import MapAPI from './Map';
import Location from './location';

function App(props) {
  const [search, setSearch] = useState()
  const [query, setQuery] = useState()
	const handleQueryChange = (e) => {
    e.preventDefault()
		setSearch(e.target.value)
	}
  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(search)
  }
  return (
    <>
      <Header handleQueryChange={handleQueryChange} handleSubmit={handleSubmit}/>
      <Location query={query}/>
    </>
  );
}

export default App;
