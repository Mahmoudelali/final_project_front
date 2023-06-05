import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import noImage from '../assets/PROFILE.jpg';
import { Grid } from '@mui/material';
import { approvePassenger } from '../App.jsx';

const Pending = ({ getAllTrips }) => {
	const [pendingReq, setPendingReq] = useState(null);

	const user_id = JSON.parse(localStorage.getItem('_auth_state'))._id;

	const getUserById = () => {
		axios
			.get(
				`${
					import.meta.env.VITE_APP_URL
				}/api/trips?host_name=${user_id}`,
			)
			.then((res) => {
				console.log(res.data.trips);
				setPendingReq(res.data.trips);
			})
			.catch((err) => console.log(err));
	};

	useEffect(getUserById, []);
	return !pendingReq ? (
		<Loader isComponent={true} />
	) : pendingReq.length === 0 ? (
		<span>No Placed Requests </span>
	) : (
		<div
			className="pending-container"
			style={{
				padding: '10vh 10px 2rem 10px',
			}}
		>
			<h1 className="center page-title">Join Requests</h1>
			<div style={{ marginTop: '2rem' }}>
				<table
					className="pending-table"
					style={{
						borderSpacing: 0,
					}}
				>
					<thead>
						<tr>
							<td>First name</td>
							<td>Last Name</td>
							<td>image</td>
							<td>start - end</td>
							<td>approve</td>
							<td>decline</td>
							<td>#user_id</td>
						</tr>
					</thead>
					<tbody>
						{pendingReq &&
							pendingReq.map((trip, index) => {
								return trip.passengers.map((nested) => {
									return (
										<tr key={index}>
											<td>{nested.first_name}</td>
											<td>{nested.last_name}</td>
											<td>
												<div className="table-image-container">
													<img
														src={
															!nested.image
																? noImage
																: nested.image
														}
														alt="userprofile"
													/>
												</div>
											</td>

											<td>
												{
													JSON.parse(
														trip.start_location,
													).city
												}
												<br />
												{
													JSON.parse(
														trip.end_location,
													).city
												}
											</td>

											<td>
												<button
													className="unset"
													onClick={() => {
														approvePassenger(
															trip._id,
															nested._id,
														);
														getUserById();
													}}
												>
													<CheckCircleIcon
														className="pointer"
														style={{
															color: 'green',
														}}
													/>
												</button>
											</td>
											<td>
												<Grid
													style={{
														backgroundColor:
															'lihgtgray',
													}}
												>
													<CloseIcon
														className="pointer"
														style={{
															color: 'brown',

															borderRadius: '50%',
															padding: '3px',
														}}
													/>
												</Grid>
											</td>
											<td>{nested._id}</td>
										</tr>
									);
								});
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Pending;
