import { useEffect, useState } from 'react';
import MapAPI from './Map';

function Location(props) {
	const [info, setInfo] = useState(null)
	const search = props.query
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const load = (async () => {
		if(search){
			setInfo(null)
			const response = await fetch(`http://aviation-edge.com/v2/public/flights?key=${apiKey}&flightIata=${search}`)
			const data = await response.json()
			console.log(data)
			if(!data.error){
				mapLocation(data)
			}else alert('There was no record found of the queried flight.')
		async function mapLocation(data) {
			const depResponse = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${data[0].departure.iataCode}`)
			const arrResponse = await fetch(`https://aviation-edge.com/v2/public/airportDatabase?key=${apiKey}&codeIataAirport=${data[0].arrival.iataCode}`)
			const depData = await depResponse.json()
			const arrData = await arrResponse.json()
			console.log(depData)
			console.log(arrData)
			const flightStats = {
				stats: {id: data[0].flight.iataNumber, altitude: data[0].geography.altitude, latitude: data[0].geography.latitude, 
						longitude: data[0].geography.longitude, lastUpdate: data[0].system.updated},
				airline: data[0].airline.iataCode,
				departureAirport: data[0].departure.iataCode,
				departureLat: depData[0].latitudeAirport,
				departureLng: depData[0].longitudeAirport,
				arrivalAirport: data[0].arrival.iataCode,
				arrivalLat: arrData[0].latitudeAirport,
				arrivalLng: arrData[0].longitudeAirport,
				status: data[0].status,
			}
				setInfo(flightStats)
				console.log(info)
			}
		}
	})
	useEffect(() => {
		load();
	}, [search])
	
	return (info ? <MapAPI  data={info} /> : null)
}

export default Location;