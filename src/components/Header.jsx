import '../styles/Header.css';
import {useState, useEffect } from 'react'

function Header(props) {
	const [name, setName] = useState(null)
	const getName = (async () => {
		const request = await fetch('http://localhost:5000/name', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await request.json()
		if (data.status === 'ok') {
			setName(data.name)
		} else {
			setName(null)
		}
	})

	useEffect(() => {
		getName();
	}, [])
	
	return (
		<>
			<nav className="nav-bar">
				<div className='left'>
					<button className="plane-icon">planeicon</button>
					{ name ? <p>{name}</p> : null}
				</div>
				<div className='center'>
					<form onSubmit={props.handleSubmit}>
						<input className="search-query" onChange={props.handleQueryChange} />
					</form>
				</div>
				<div className='right'>
					{ name ? <a href='/logout'>Logout</a> : <a href='/login' className="login">Login</a> }
				</div>
			</nav>
		</>

	)
}

export default Header;