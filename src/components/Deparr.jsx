import {useState, useEffect} from 'react'
import {r7, r8, r9} from './Regex'



function Deparr(props) {
	const [info, setInfo] = useState(null)
	const search = props.query
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const load = (async () => {
		if(search){
			if(r7.test(search)){
				setInfo(null)
				const response2 = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${search}`)
				const data2 = await response2.json()
				console.log(data2[0])
				if(!data2.error){
					const response = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=departure`)
					const response1 = await fetch(`http://aviation-edge.com/v2/public/timetable?key=${apiKey}&iataCode=${search}&type=arrival`)
					const data = await response.json()
					const data1 = await response1.json()
					console.log(data[0])
					console.log(data1[0])
					departures(data)
				} else alert('There was no record found of the queried airport.')
			}
		}
	})
	function departures(data) {
		const scheduled = data.filter(schedule => schedule.status === 'scheduled')
		const sortbyTerm = function(a,b){
			if(a.departure.terminal > b.departure.terminal){
				return 1;
			}
			if(a.departure.terminal < b.departure.terminal){
				return -1;
			}
			return a.departure.terminal - b.departure.terminal
		}
		const terminal = scheduled.sort(sortbyTerm)
		// const 


		}
		// const scheduled = data.map((info, i) => {
		// 	const schedule = info.filter()
		// })

	useEffect(() => {
		load();
	}, [search])
	return <>Hey..</>
}

export default Deparr;