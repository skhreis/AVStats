import {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Register() {
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	let navigate = useNavigate()
	const registerUser = (async (e) => {
		e.preventDefault()
		const response = await fetch('http://localhost:5000/register', {
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
		alert('Account creation successful!')
		navigate('/')
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
	
	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
					<h3 className="text-2xl font-bold">Create an Account <br /> with AVStats</h3>
					<form onSubmit={registerUser}>
						<div className="mt-4">
							<label className="block">Name</label>
							<input value={name} onChange={nameHandleChange} type="text" placeholder="Name"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
						</div>
						<div className="mt-4">
							<label className="block">Email</label>
							<input value={email} onChange={emailHandleChange} type="text" placeholder="Email"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
						</div>
						<div className="mt-4">
							<label className="block">Password</label>
							<input value={password} onChange={passwordHandleChange} type="password" placeholder="Password"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
							</input>
							<div className="flex items-baseline justify-between">
								<button type='submit' value='register'
								className="px-5 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600">Create Account</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Register;