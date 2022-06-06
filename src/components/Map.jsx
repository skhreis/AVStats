import {useState, useEffect, useMemo} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import '../styles/Map.css'

function MapAPI(props) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyAolxBj2XaFusBmId3DAzHQdrH9-KUG-bI'
	});
	if(!isLoaded) return <div>Loading...</div>;
	return <Map {...props} />;
};

function Map(props) {
	console.log(props.data)
	let lat = props.data.stats.latitude
	let lng = props.data.stats.longitude
	return(
		<GoogleMap zoom={3} center={{lat: lat, lng: lng}} mapContainerClassName="map-container">
			<Marker position={{lat: lat, lng: lng}} />
		</GoogleMap>
	)
}

export default MapAPI;
