import '../styles/App.css'
import '../styles/Map.css'
import { useState } from 'react'
import Header from './Header';
import Location from './Map/location';
import Deparr from './Schedule/Deparr';


function App(props) {
  const [mapsModal, setMapsModal] = useState(false)
  const [deparrModal, setDeparrModal] = useState(false)

  return (
    <>
      <Header />
      <div className='banner-container'>
        <div className='banner-pic'>
          <div className='banner-effect'>
              <h1 className='banner-header'>AVStats Flight Tracking System</h1>
              <div className='banner-description'>AVStats can track an active flight to it's very location and also checking future departures and upcoming arrivals. Press one of the buttons below to test it out. Be sure to have your flight number ready or airport abbreviation code. For a list of airports, click here for list of airport and their abbreviation.</div>
              <div className='banner-buttons'>
              <button onClick={() => {setMapsModal(true)}} className='flights-button'>Active Flights</button>
              <button onClick={() => {setDeparrModal(true)}} className='deparr-button'>Departures/Arrivals</button>
              </div>
          </div>
        </div>
      </div>
      {mapsModal && <Location modal={setMapsModal} />}
      {deparrModal && <Deparr modal={setDeparrModal} />}
    </>
  );
}

export default App;
