import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Register() {
	const [name, setName] = useState(null)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	let navigate = useNavigate()
	const registerUser = (async (e) => {
		e.preventDefault()
		if (password) {
			const response = await fetch('http://localhost:8000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				})
			})
			const data = await response.json()
			if (data) {
				alert('Account creation successful!')
				navigate('/')
			} else alert('Something went wrong, try again.')
		} else alert('Requires Email, Name, and Password')
		
	})

		function nameHandleChange(e) {
			e.preventDefault()
			setName(e.target.value)
		}
		function emailHandleChange(e) {
			e.preventDefault()
			setEmail(e.target.value)
		}
		function passwordHandleChange(e) {
			e.preventDefault()
			setPassword(e.target.value)
		}

		function signIn() {
			navigate('/login')
		}

		return (
			<>
				<div className='login-container'>
					<div className="login-form">
						<h1>AVStats Login</h1>
						<form onSubmit={signIn} className="content">
							<div className="input-field">
								<input onChange={nameHandleChange} type="name" placeholder="Name" autocomplete="nope" />
							</div>
							<div className="input-field">
								<input onChange={emailHandleChange} type="email" placeholder="Email" autocomplete="nope" />
							</div>
							<div className="input-field">
								<input onChange={passwordHandleChange} type="password" placeholder="Password" autocomplete="nope" />
							</div>
						</form>
						<div className="action">
							<button onClick={registerUser}>Register</button>
							<button onClick={signIn}>Sign in</button>
						</div>
					</div>
				</div>
			</>
		)
	}

export default Register;