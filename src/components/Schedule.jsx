import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Schedule(props) {
	// let airport = props.airport
	let departures = props.departures
	let arrivals = props.arrivals
	console.log(arrivals)
	const depTable = departures.map((dep, i) => {
		return (
			<>
				<tr key={i}>
					<td>{dep.departure.scheduledTime}</td>
					<td>{dep.flight.iataNumber}</td>
					<td>{dep.airline.name}</td>
					<td>{dep.arrival.iataCode}</td>
					<td>{dep.departure.gate}</td>
					<td>{dep.status}</td>
				</tr>
			</>
		)
	})
	const arrTable = arrivals.map((arr, i) => {
		return (
			<>
				<tr key={i}>
					<td>{arr.arrival.scheduledTime}</td>
					<td>{arr.flight.iataNumber}</td>
					<td>{arr.airline.name}</td>
					<td>{arr.departure.iataCode}</td>
					<td>{arr.arrival.gate}</td>
					<td>{arr.status}</td>
				</tr>
			</>
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
					<p>Times are in origin local</p>
					<table className="table-auto">
						<thead>
							<th>Time</th>
							<th>Flight Number</th>
							<th>Airline</th>
							<th>Destination</th>
							<th>Gate</th>
							<th>Status</th>
						</thead>
						<tbody>
							{depTable}
						</tbody>
					</table>
				</TabPanel>
				<TabPanel>
					<p>Times are in destination local</p>
					<table className="table-auto">
						<thead>
							<th>Time</th>
							<th>Flight Number</th>
							<th>Airline</th>
							<th>Origin</th>
							<th>Gate</th>
							<th>Status</th>
						</thead>
						<tbody>
							{arrTable}
						</tbody>
					</table>
				</TabPanel>
			</Tabs>
		</>
	)
}

export default Schedule;


<table className="table-auto">
	<thead>
		<th>Time</th>
		<th>Flight Number</th>
		<th>Airline</th>
		<th>Destination</th>
		<th>Gate</th>
		<th>Status</th>
	</thead>
	<tbody>
		<tr>1</tr>
		<tr>2</tr>
		<tr>3</tr>
		<tr>4</tr>
		<tr>5</tr>
		<tr>6</tr>
	</tbody>
</table>