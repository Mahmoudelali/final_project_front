import React, { useEffect } from 'react';
import { getAllPending, getUserById } from '../App.jsx';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar.jsx';

const HostedTrips = () => {
	const user_id = JSON.parse(Cookies.get('user'))._id;
	useEffect(() => {
		getUserById(user_id);
	}, []);
	// useEffect(() => {
	// 	getAllPending();
	// }, []);
	return (
		<div>
			<Sidebar />
			<div className="hosted-trips-container">
                
            </div>
		</div>
	);
};

export default HostedTrips;
