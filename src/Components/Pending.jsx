import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllPending, getTripsByUserID } from '../App.jsx';
import Loader from './Loader.jsx';

const Pending = () => {
	const [pendingReq, setPendingReq] = useState(null);

	const user_id = JSON.parse(localStorage.getItem('_auth_state'))._id;
	console.log(user_id);
	const getUserById = () => {
		axios
			.get(`${import.meta.env.VITE_APP_URL}/api/user/${user_id}`)
			.then((response) => {
				console.log(response.data.message.hosted_trips);
			});
	};
	useEffect(getUserById, []);
	return (
		<div
			style={{
				paddingTop: '9vh',
			}}
		>
			<h1 className="center page-title">Join Requests</h1>
			<table>
				<thead>
					<tr>
						<td>username</td>
						<td>image</td>
						<td>username</td>
						<td>id</td>
						<td>trip</td>
						{/*start loc to end loc*/}
					</tr>
				</thead>
				{pendingReq && (
					<tbody>
						<tr>
							<td>test</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	);
};

export default Pending;
