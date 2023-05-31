import React from 'react';
import '../styles/profile.css';
import profile from '../assets/PROFILE.jpg';
import Sidebar from './Sidebar';
import Cookies from 'js-cookie';

const Profile = () => {
	const userData = Cookies.get('user') && JSON.parse(Cookies.get('user'));
	const { first_name, last_name, joined_trips, hosted_trips, phone } =
		userData;
	console.log(userData);
	return (
		<div className="user-profile-card-container">
			<Sidebar />
			<img src={profile} alt="user" />
			<h3>
				{first_name} {last_name}
			</h3>
			<h6>PickMeUp user</h6>
			<h6>{phone}</h6>
			<p>
				<span>
					<strong>joined_trips</strong>
					{/* {joined_trips} */}
				</span>{' '}
				|{' '}
				<span>
					<strong>hosted_trips</strong> {hosted_trips.length}
				</span>
			</p>
			<p></p>
			{/* <div className="buttons">
				<button className="primary">Message</button>
				<button className="primary ghost">Following</button>
			</div> */}
		</div>
	);
};

export default Profile;
