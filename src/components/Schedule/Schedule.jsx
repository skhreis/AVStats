import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './styles/Schedule.css'


function Schedule(props) {
	let airport = props.airport[0].codeIataAirport
	let departures = props.departures
	let arrivals = props.arrivals

	async function addFavoriteAirport() {
		const response = await fetch('http://localhost:8000/favorites/airport', {
			method: 'PUT',
			headers: {
				'x-access-token': localStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ airport })
		})
		const data = await response.json()
		if(data){
			alert(`Added ${airport} to favorites.`)
		} else alert('You must be logged in to add to favorites.')
	}

	async function delFavoriteAirport() {
		const response = await fetch('http://localhost:8000/favorites/airport/delete', {
			method: 'DELETE',
			headers: {
				'x-access-token': localStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ airport })
		})
		const data = response.json()
		if(data){
			alert(`Deleted ${airport} from favorites.`)
		} else alert("You either aren't logged in or it doesn't exist in your favorites.")
	}

	const depTable = departures.map((dep, i) => {
		return (
				<tr key={i}>
					<td>{dep.departure.scheduledTime}</td>
					<td>{dep.flight.iataNumber}</td>
					<td>{dep.airline.name}</td>
					<td>{dep.arrival.iataCode}</td>
					<td>{dep.departure.gate}</td>
					<td>{dep.status}</td>
				</tr>
		)
	})
	const arrTable = arrivals.map((arr, i) => {
		return (
				<tr key={i}>
					<td>{arr.arrival.scheduledTime}</td>
					<td>{arr.flight.iataNumber}</td>
					<td>{arr.airline.name}</td>
					<td>{arr.departure.iataCode}</td>
					<td>{arr.arrival.gate}</td>
					<td>{arr.status}</td>
				</tr>
		)
	})
	return (
		<>
			<Tabs>
				<TabList>
					<Tab>Departures</Tab>
					<Tab>Arrivals</Tab>
				</TabList>
				<TabPanel>
					<div>
						<p>Airport: {airport}
						<button className="favorites" onClick={addFavoriteAirport}>Add to Favorites</button>
						<button className="favorites" onClick={delFavoriteAirport}>Delete from Favorites</button>
						</p>
					</div>
					<p>Times are in origin local</p>
					<div className='table-container'>
						<table className="fl-table">
							<thead>
								<tr>
								<th>Time</th>
								<th>Flight Number</th>
								<th>Airline</th>
								<th>Destination</th>
								<th>Gate</th>
								<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{depTable}
							</tbody>
						</table>
					</div>
				</TabPanel>
				<TabPanel>
					<div className='favorite-airport'>
						<p>Airport: {airport}
						<button className="favorites" onClick={addFavoriteAirport}>Add to Favorites</button>
						<button className="favorites" onClick={delFavoriteAirport}>Delete from Favorites</button>
						</p>
					</div>
					<p>Times are in destination local</p>
					<div className='table-container'>
						<table className="fl-table">
							<thead>
								<tr>
								<th>Time</th>
								<th>Flight Number</th>
								<th>Airline</th>
								<th>Origin</th>
								<th>Gate</th>
								<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{arrTable}
							</tbody>
						</table>
					</div>
				</TabPanel>
			</Tabs>
		</>
	)
}

export default Schedule;