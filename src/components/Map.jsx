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
	console.log(props)
	return(
		<GoogleMap zoom={10} center={{lat: 40, lng: -80}} mapContainerClassName="map-container">
			<Marker position={{lat: 40, lng: -80}} />
		</GoogleMap>
	)
}

export default MapAPI;
