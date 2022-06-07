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
	const [lat, setLat] = useState(1)
	const [lng, setLng] = useState(1)
	useEffect(() => {
	setLat(props.data.stats.latitude)
	setLng(props.data.stats.longitude)
	console.log(props)
	console.log(lat)
	console.log(lng)
	}, [props])

	return(
		<GoogleMap zoom={3} center={{lat: lat, lng: lng}} mapContainerClassName="map-container">
			<Marker position={{lat: lat, lng: lng}} />
		</GoogleMap>
	)
}


export default MapAPI;
