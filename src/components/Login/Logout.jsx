import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Logout() {
	let navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('token')
		navigate('/')
	  }

	  useEffect(() => {
		logout();
	}, [])
}

export default Logout;