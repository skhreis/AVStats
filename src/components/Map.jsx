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
	const [fllat, setFlLat] = useState(1)
	const [fllng, setFlLng] = useState(1)

	const [deplat, setDeplat] = useState(1)
	const [deplng, setDeplng] = useState(1)
	
	const [arrlat, setArrat] = useState(1)
	const [arrlng, setArrng] = useState(1)
	useEffect(() => {
	setLat(props.data.stats.latitude)
	setLng(props.data.stats.longitude)

	}, [props])

	return(
		<GoogleMap zoom={3} center={{lat: lat, lng: lng}} mapContainerClassName="map-container">
			<Marker position={{lat: lat, lng: lng}} />
		</GoogleMap>
	)
}


export default MapAPI;
