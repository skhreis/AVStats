import {useState, useEffect} from 'react'
import {r7} from './Regex'



function Deparr(props) {
	const [info, setInfo] = useState(null)
	const search = props.query
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const load = (async () => {
		if(search){
			if(r7.test(search)){
				setInfo(null)
				// const response = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=departure`)
				// const response1 = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=arrival`)
				const response2 = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${search}`)
				// const data = await response.json()
				const data1 = await response2.json()
				// console.log(data)
				console.log(data1)
			}
		}
	})
	// function departures(data) {

	// }
	useEffect(() => {
		load();
	}, [search])
	return <>Hey..</>
}

export default Deparr;