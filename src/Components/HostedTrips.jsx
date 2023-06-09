import React, { useEffect, useState } from 'react';
import { getAllPending, getTripsByUserID } from '../App.jsx';
import Passengers from './Passengers.jsx';
import RecentActivity from './RecentActivity.jsx';
import { useAuthUser } from 'react-auth-kit';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const HostedTrips = () => {
	// const user_id = JSON.parse(Cookies.get('user'))._id;
	const userData = useAuthUser();
	const user_id = userData()._id;
	const [userTrips, setUserTrips] = useState([]);
	const getUserById = () => {
		axios
			.get(
				`${
					import.meta.env.VITE_APP_URL
				}/api/trips?host_name=${user_id}`,
			)
			.then((res) => {
				console.log(res.data.trips);
				setUserTrips(res.data.trips);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getUserById();
	}, []);

	return (
		<div>
			<div
				className="hosted-trips-container"
				style={{ paddingTop: '10vh' }}
			>
				<h2
					style={{
						textAlign: 'center',
						marginBottom: '1rem',
						color: '#191933',
					}}
				>
					Hosted Trips
				</h2>
				{userTrips.length === 0 ? (
					<>
						<h1 className="center page-title">No Trips Found!</h1>
						<NavLink
							className={'center'}
							style={{ display: 'block', marginTop: '.5rem' }}
							to="/new"
						>
							Try Hosting a Trip !
						</NavLink>
					</>
				) : (
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
							approvedPassengers,
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
											<Passengers
												arrayOfUsers={
													approvedPassengers
												}
											/>
										</span>
									</div>
								</article>
							);
						},
					)
				)}
			</div>
		</div>
	);
};

export default HostedTrips;
