import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'

function Login() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	let navigate = useNavigate()

	const signIn = (async (e) => {
		e.preventDefault()
		const response = await fetch('http://localhost:8000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			})
		})
		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login Successful!')
			navigate('/')

		} else {
			console.log(data.error)
			alert('Invalid email or password.')
		}
		console.log(data)
	})

	function emailHandleChange(e) {
		e.preventDefault()
		setEmail(e.target.value)
	}
	function passwordHandleChange(e) {
		e.preventDefault()
		setPassword(e.target.value)
	}

	function register(){
		navigate('/register')
	}
	return (
		<div className='login-container'>
			<div className="login-form">
				<h1>AVStats Login</h1>
				<form onSubmit={signIn} className="content">
					<div className="input-field">
						<input onChange={emailHandleChange} type="email" placeholder="Email" autoComplete="nope" />
					</div>
					<div className="input-field">
						<input onChange={passwordHandleChange} type="password" placeholder="Password" autoComplete="nope" />
					</div>
				</form>
				<div className="action">
					<button onClick={register}>Register</button>
					<button onClick={signIn}>Sign in</button>
				</div>
			</div>
		</div>
	)
}
export default Login