import React from 'react';
import profile from '../assets/PROFILE.jpg';

const Passengers = () => {
	return (
		<div className="passengers">
			<div>
				<img src={profile} alt="" />
			</div>
			<div>
				<img src={profile} alt="" />
			</div>
		</div>
	);
};

export default Passengers;
