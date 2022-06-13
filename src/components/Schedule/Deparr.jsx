import { useState } from 'react'
import Schedule from './Schedule'
import './styles/Schedule.css'

function Deparr(props) {
	const [departures, setDepartures] = useState()
	const [arrivals, setArrivals] = useState()
	const [airport, setAirport] = useState()
	const [search, setSearch] = useState()
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const load = (async (e) => {
		e.preventDefault()
		if(search){
				setArrivals(null)
				const response = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${search}`)
				const data = await response.json()
				if(!data.error){
					const response1 = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=departure`)
					const response2 = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=arrival`)
					const data1 = await response1.json()
					const data2 = await response2.json()
					setAirport(data)
					filterDep(data1)
					timeFixArr(data2)
				} else alert('There was no record found of the queried airport.')
			}
	})

	function filterDep(deps){
		let arr = deps.filter(dep => dep.flight.iataNumber && dep.status !== 'active' && dep.status !== 'unknown');
		for(let i = 0; i+1 < arr.length; i++){
			if(arr[i].departure.scheduledTime === arr[i+1].departure.scheduledTime &&
			   arr[i].departure.gate === arr[i+1].departure.gate){			
					arr.splice(i, 1);
					i=-1
			}
		}
		timeFixDep(arr)
}



	function timeFixDep(dep) {
		for(let i = 0; i < dep.length; i++){
			let depTime = dep[i].departure.scheduledTime
			let time = depTime.slice(11,16)
			dep[i].departure.scheduledTime = `${time}`
		}
		setDepartures(dep)
	}
	function timeFixArr(arr){
		for(let i = 0; i < arr.length; i++){
			let depTime = arr[i].arrival.scheduledTime
			let time = depTime.slice(11,16)
			arr[i].arrival.scheduledTime = `${time}`
		}
		setArrivals(arr)
	}

	function searchHandleChange(e) {
		e.preventDefault()
		setSearch(e.target.value)
	}

	return (
		<>
			<div className='deparr-background'></div>
			<div className='deparr-container'>
				<button onClick={() => { props.modal(false) }} className='close-deparr'>X</button>
				<div className='top'>
					<form className='search' onSubmit={load}>
						<input onSubmit={load} onChange={searchHandleChange} className='flights-input' placeholder='Enter Airport Iata Code..'></input>
						<button onClick={load} className='search-button'>Search</button>
					</form>
				</div>
				<div className='table'>
					<div className='deparr'>
						{arrivals ? <Schedule arrivals={arrivals} departures={departures} airport={airport} /> : null}
					</div>
				</div>
			</div>
		</>
	)
}

export default Deparr;