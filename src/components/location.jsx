import { useEffect } from 'react';
import MapAPI from './Map';
import {r1, r2, r3, r4, r5, r6} from './Regex';
import flightStats from './information';

function Location(props) {
	const search = props.query
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const url = `http://aviation-edge.com/v2/public/flights?key=${apiKey}&flightIcao=${props.query}`
	const load = (async () => {
		if(search){
			if(r1.test(search) | r2.test(search) | r3.test(search) | r4.test(search) | r5.test(search) | r6.test(search)) {
				const response = await fetch(url)
				const data = await response.json()
				mapLocation(data)
			}
		}
		function mapLocation(data) {
			flightStats.stats.id = data[0].flight.iataNumber
			flightStats.stats.altitude = data[0].geography.altitude
			flightStats.stats.latitude = data[0].geography.latitude
			flightStats.stats.longitude = data[0].geography.longitude
			flightStats.stats.lastUpdate = data[0].system.updated
			flightStats.airline = data[0].airline.iataCode
			flightStats.departureAirport = data[0].departure.iataCode
			flightStats.arrivalAirport = data[0].arrival.iataCode
			flightStats.status = data[0].status
			console.log(flightStats)
		return(
			<MapAPI flightStats={flightStats} />
		)
		}

	})

	useEffect(() => {
		load();
	}, [search])
	
	return (<></>)
}

export default Location;