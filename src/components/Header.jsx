import '../styles/Header.css';
import { useState, useEffect} from 'react'
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
	useEffect(() => {
		getName();
	}, [])


	const faves = (async () => {
		if(name) {
			const response = await fetch('http://localhost:8000/favorites', {
				headers: {
					'x-access-token': localStorage.getItem('token'),
				},
			})
			const data = await response.json()
			console.log(data)
			if(data.status === 'ok') {
				setFavorites(data.favorites)
			} else return
		}
	})
	useEffect(() => {
		faves();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name])

	function airports(){
		window.open("https://airports-list.com/iata-code", "_blank")
	}
	
	function logout(){
		navigate("/logout")
	}
	function login(){
		navigate('/login')
	}

	return (
		<>
			<nav onLoad={getName} className="nav-bar">
			<ul className='header-list'>
				<li className='header-card'>AVStats</li>
				<li className='header-card'>Favorites</li>
				<li className='header-card' onClick={airports}>Airports</li>
				{ name ? <li className='header-card' onClick={logout}>Logout</li> : <li className='header-card' onClick={login}>Login</li> }
				{ name ? <li className='header-card'><span>Welcome, {name}</span></li> : null}
			</ul>
			</nav>

		</>

	)
}

export default Header;