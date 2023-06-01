import React, { useEffect, useState } from 'react';
import { getAllPending, getTripsByUserID } from '../App.jsx';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar.jsx';
import Passengers from './Passengers.jsx';
import RecentActivity from './RecentActivity.jsx';

const HostedTrips = () => {
	const user_id = JSON.parse(Cookies.get('user'))._id;
	const [userTrips, setUserTrips] = useState(null);
	useEffect(() => {
		getTripsByUserID(user_id, setUserTrips);
	}, []);

	return (
		<div>
			<Sidebar />

			<div className="hosted-trips-container">
				<h2
					style={{
						textAlign: 'center',
						marginBottom: '1rem',
						color: '#191933',
					}}
				>
					Hosted Trips
				</h2>
				{userTrips &&
					userTrips.map(
						({
							createdAt,
							cost,
							_id,
							start_location,
							end_location,
							// passengers,
							start_date,
							start_time,
							vehicle_type,
							seats,
						}) => {
							return (
								<article key={_id}>
									<div>
										<RecentActivity
											start_location={
												JSON.parse(start_location).city
											}
											end_location={
												JSON.parse(end_location).city
											}
											time={start_time}
											date={start_date}
										/>
									</div>
									<div
										style={{
											position: 'relative',
											paddingLeft: '15px',
										}}
									>
										<span className="card-separator"></span>
										<span className="block">
											<strong>Created at</strong>{' '}
											{createdAt.substring(0, 10)}
										</span>

										<span className="block">
											<strong>Vehicle type</strong>{' '}
											{vehicle_type}
										</span>

										<span className="block">
											<strong>seats</strong> {seats}
										</span>
										<span className="block">
											<strong>Start Date</strong>{' '}
											{start_date}
										</span>
										<span className="block">
											<strong>Cost</strong> {cost} L.L
										</span>
										<span
											className="block"
											style={{
												marginTop: '10px',
											}}
										>
											<Passengers />
										</span>
									</div>
								</article>
							);
						},
					)}
			</div>
		</div>
	);
};

export default HostedTrips;
