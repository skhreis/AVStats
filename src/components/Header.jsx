import '../styles/Header.css';
import {useState} from 'react';


function Header(props) {
	
	return(
		<>
			<nav className = "nav-bar">
				<div className= 'left'>
					<button className= "plane-icon">planeicon</button>
				</div>
				<div className= 'center'>
					<form onSubmit={props.handleSubmit}>
						<input className= "search-query" onChange={props.handleQueryChange}/>
					</form>
				</div>
				<div className= 'right'>
					<button className= "tracker">Tracker</button>
					<button className= "dep-arr">Dep/Arr</button>
					<button className= "login">Login</button>
				</div>
			</nav>
		</>
	)
}

export default Header;