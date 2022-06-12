import axios from 'axios'

export function addFavoriteAirport() {
	axios.put('http://localhost:8000/favorites/airport', {
		

	})
}

export function delFavoriteAirport() {
	axios.delete('http://localhost:8000/favorites/airport/delete', {

	})
}

