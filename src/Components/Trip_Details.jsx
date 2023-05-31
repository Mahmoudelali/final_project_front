import React, { useEffect, useState } from 'react';
import Passengers from './Passengers.jsx';
import { Outlet, useParams } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { getTripByID } from '../App.jsx';
import Map from './Map.jsx';
const TripDetails = ({ detailsExpanded, setDetailsExpanded }) => {
	const id = useParams();
	const [trip, setTrip] = useState({});
	useEffect(() => {
		getTripByID({ trip_id: id.id, stateHandler: setTrip, state: trip }), [];
	});

	return (
		<>
			<Sidebar />
			<div className="details-container">
				<div className="map-container">
					{/* <Map origin={origin} destination={destination} /> */}
				</div>
			</div>
		</>
	);
};

export default TripDetails;
