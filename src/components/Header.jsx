import '../styles/Header.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Header(props) {
	const navigate = useNavigate()
	const [name, setName] = useState(null)
	const [favorites, setFavorites] = useState()
	const getName = (async () => {
		const response = await fetch('http://localhost:8000/name', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await response.json()
		if (data.status === 'ok') {
			setName(data.name)
		}
	})

	const faves = (async () => {
		const response = await fetch('http://localhost:8000/favorites', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
		const data = await response.json()
		if (data.status === 'ok') {
			setFavorites(data.favorites.favorites)
			alert(`Your favorites are: ${favorites}`)
		} else {
			alert('Please login to access Favorites.')
			navigate('/')
		}
	})

	useEffect(() => {
		getName();
	}, [])

return (
	<>
		<nav onLoad={getName} className="nav-bar">
			<ul className='header-list'>
				<li className='header-card'>AVStats</li>
				<li className='header-card' onClick={faves}>Favorites</li>
				<li className='header-card' onClick={() => {window.open("https://airports-list.com/iata-code", "_blank")}}>Airports</li>
				{name ? <li className='header-card' onClick={() => {navigate('/logout')}}>Logout</li>
				 : <li className='header-card' onClick={() => {navigate('/login')}}>Login</li>}
				{name ? <li className='header-card'><span>Welcome, {name}</span></li> : null}
			</ul>
		</nav>

	</>

)
}

export default Header;