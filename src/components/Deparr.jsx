import {useState, useEffect} from 'react'
import {r7, r8, r9} from './Regex'
import Schedule from './Schedule'


function Deparr(props) {
	const [departures, setDepartures] = useState()
	const [arrivals, setArrivals] = useState()
	const [airport, setAirport] = useState()
	const search = props.query
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const load = (async () => {
		if(search){
			if(r7.test(search)){
				setArrivals(null)
				const response = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${search}`)
				const data = await response.json()
				if(!data.error){
					const response1 = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=departure`)
					const response2 = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=arrival`)
					const data1 = await response1.json()
					const data2 = await response2.json()
					setAirport(data)
					timeFixDep(data1)
					timeFixArr(data2)
				} else alert('There was no record found of the queried airport.')
			}
		}
	})
	function timeFixDep(dep) {
		for(let i = 0; i < dep.length; i++){
			let depTime = dep[i].departure.scheduledTime
			let date = depTime.slice(0, 10)
			let year = date.slice(0,4)
			let month = date.slice(5,7)
			let day = date.slice(8,10)
			let time = depTime.slice(11,16)
			dep[i].departure.scheduledTime = `${day}/${month}/${year} ${time}`
		}
		setDepartures(dep)
	}
	function timeFixArr(arr){
		for(let i = 0; i < arr.length; i++){
			let depTime = arr[i].arrival.scheduledTime
			let date = depTime.slice(0, 10)
			let year = date.slice(0,4)
			let month = date.slice(5,7)
			let day = date.slice(8,10)
			let time = depTime.slice(11,16)
			arr[i].arrival.scheduledTime = `${day}/${month}/${year} ${time}`
		}
		setArrivals(arr)
	}
	useEffect(() => {
		load();
	}, [search])
	return (arrivals ? <Schedule arrivals={arrivals} departures={departures} airport={airport} /> : null)
}

// const scheduled = data.map((info, i) => {
	// 	const schedule = info.filter()
	// })
	// let i
	
	// const scheduled = data.filter(schedule => schedule.status === 'scheduled')
	// const sortbyTerm = function(a,b){
	// 	if(a.departure.terminal > b.departure.terminal){
	// 		return 1;
	// 	}
	// 	if(a.departure.terminal < b.departure.terminal){
	// 		return -1;
	// 	}
	// 	return a.departure.terminal - b.departure.terminal
	// }
	// const terminal = scheduled.sort(sortbyTerm)
	// for(i=0; i < terminal.length; i++){
	// 	if(terminal[i].departure.terminal === '1'){
			
	// 	}
	// }
export default Deparr;