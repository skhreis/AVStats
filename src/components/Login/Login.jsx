import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	let navigate = useNavigate()

	const signIn = (async (e) => {
		e.preventDefault()
		const response = await fetch('http://localhost:5000/login', {
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
	})


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
					<h3 className="text-2xl font-bold text-center">Login</h3>
					<form onSubmit={signIn}>
						<div className="mt-4">
							<label className="block">Email</label>
							<input type="text" placeholder="Email" onChange={emailHandleChange}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
						</div>
						<div className="mt-4">
							<label className="block">Password</label>
							<input type="password" placeholder="Password" onChange={passwordHandleChange}
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
							<div className="flex items-baseline justify-between">
								<button className="px-3 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
								<a className="px-3 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" href='/register'>Register</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
export default Login