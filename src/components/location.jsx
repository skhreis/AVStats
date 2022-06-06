import { useEffect } from 'react';
import { useState } from 'react';
import App from './App';


function Location(props) {
	const search = props.query
	const apiKey= process.env.REACT_APP_API_KEY_LONGLAT
	const url = `http://aviation-edge.com/v2/public/flights?key=${apiKey}&flightIcao=${props.query}`
	const load = (async () => {
		if(search){
		const response = await fetch(url)
		const data = await response.json()
		console.log(data)
		}
	})

	useEffect(() => {
		load();
	}, [search])
	return (
		<>
		hey
		</>
	)
}

export default Location;