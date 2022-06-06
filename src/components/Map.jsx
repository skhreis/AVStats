import {useState, useEffect, useMemo} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import '../styles/Map.css'

function MapAPI() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: 'AIzaSyAolxBj2XaFusBmId3DAzHQdrH9-KUG-bI'
	});
	if(!isLoaded) return <div>Loading...</div>;
	return <Map />;
};

function Map(props) {
	const center = useMemo(() => ({ lat: 44, lng: -80}), []);
	return(
		<GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
			<Marker position={center} />
			<Marker position={{lat: 30, lng: -80}} />
		</GoogleMap>
	)
}

export default MapAPI;
