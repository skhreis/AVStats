import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import '../../styles/Map.css'

function MapAPI(props) {
	const apiKey = process.env.REACT_APP_API_KEY_MAP
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: apiKey
	});
	if(!isLoaded) return <div>Loading...</div>;
	return <Map {...props} />;
};


function Map(props) {
	const [data, setData] = useState(null)
	useEffect(() => {
		setData(props)
	}, [props])

	function loading() {
		return(
			<GoogleMap zoom={2} center={{lat: data.data.stats.latitude, lng: data.data.stats.longitude}} mapContainerClassName="map-container">
				<Marker title='Airplane Position' label='F' position={{lat: data.data.stats.latitude, lng: data.data.stats.longitude}} />
				<Marker title='Departure Airport' label='D' position={{lat: data.data.departureLat, lng: data.data.departureLng }} />
				<Marker title='Arrival Airport' label='A' position={{lat: data.data.arrivalLat, lng: data.data.arrivalLng }} />
			</GoogleMap>
		)
	}
	return(data ? loading() : <div>Loading...</div>)
}


export default MapAPI;