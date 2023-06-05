import React from 'react';
import profile from '../assets/PROFILE.jpg';

const Passengers = () => {
	return (
		<div className="passengers">
			<div style={{ position: 'relative', zindex: -1 }}>
				<img src={profile} alt="" />
			</div>
			<div>
				<img src={profile} alt="" />
			</div>
		</div>
	);
};

export default Passengers;
