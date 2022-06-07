import { useEffect, useState } from 'react';
import MapAPI from './Map';
import {r1, r2, r3, r4, r5, r6, r7} from './Regex';

function Location(props) {
	const [info, setInfo] = useState(null)
	const search = props.query
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const load = (async () => {
		if(search){
			if(r1.test(search) | r2.test(search) | r3.test(search) | r4.test(search) | r5.test(search) | r6.test(search)) {
				setInfo(null)
				const response = await fetch(`http://aviation-edge.com/v2/public/flights?key=${apiKey}&flightIcao=${search}`)
				const data = await response.json()
				mapLocation(data)
			}
		async function mapLocation(data) {
			const depResponse = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${data[0].departure.iataCode}`)
			const arrResponse = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${data[0].departure.iataCode}`)
			const depData = await depResponse.json()
			const arrData = await arrResponse.json()
			const flightStats = {
				stats: {id: data[0].flight.iataNumber, altitude: data[0].geography.altitude, latitude: data[0].geography.latitude, 
						longitude: data[0].geography.longitude, lastUpdate: data[0].system.updated},
				airline: data[0].airline.iataCode,
				departureAirport: data[0].departure.iataCode,
				departureLat: depData[0].latitudeAirport,
				arrivalAirport: data[0].arrival.iataCode,
				arrivalLat: arrData[0].longitudeAirport,
				status: data[0].status,
			}
				setInfo(flightStats)
			}
		}
	})
	useEffect(() => {
		load();
	}, [search])
	
	return (info ? <MapAPI data={info} /> : <div>Loading...</div>)
}

export default Location;