import React, { useContext, useEffect, useState } from 'react';

import { Outlet, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { sidebarStatus } from '../App.jsx';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import PreviewTrip from '../Components/PreviewTrip.jsx';

const Home = ({ getAllTrips }) => {
	const [sidebarExpanded, setSidebarExpanded] = useContext(sidebarStatus);
	const [trips, setTrips] = useState(null);
	useEffect(() => {
		getAllTrips(setTrips);
	}, []);

	return (
		<div className="homepage-container">
			<button
				onClick={() => {
					setSidebarExpanded(!sidebarExpanded);
				}}
				className="toggle-icons unset"
			>
				{!sidebarExpanded ? <MenuIcon /> : <CloseIcon />}
			</button>

			<main>
				<div className="home-hero-section">
					<div>
						<h1>
							Contribute to a Healthier, Greener, and Cleaner
							world ! <br />
							Start Carpooling
						</h1>
						<div className="btns-container">
							<NavLink to={'/new'}>Host a Trip</NavLink>
							<NavLink to={'/trips/join'}>Join One</NavLink>
						</div>
					</div>
				</div>
				<div style={{ padding: '2rem 0 ' }}>
					{!trips ? (
						<Loader component_loading={true} />
					) : trips && trips.length === 0 ? (
						<p style={{ textAlign: 'center' }}>
							Sorry, No Trips found
						</p>
					) : (
						trips
							.slice(0, 5)
							.map(
								({
									_id,
									host_name,
									profile,
									approved_passengers,
									vehicle_type,
									cost,
									start_location,
									end_location,
									start_date,
									seats,
									description,
									start_time,
								}) => {
									return (
										<PreviewTrip
											setTrips={setTrips}
											tripID={_id}
											key={_id}
											start_time={start_time}
											vehicle_type={vehicle_type}
											price={cost}
											start_date={start_date}
											start_spot={start_location}
											end_spot={end_location}
											available_seats={seats}
											description={description}
											passengers={approved_passengers}
											host_name={host_name.first_name}
											profile={profile}
										/>
									);
								},
							)
					)}
				</div>
			</main>
		</div>
	);
};

export default Home;
