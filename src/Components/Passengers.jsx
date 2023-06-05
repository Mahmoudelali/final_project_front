import React from 'react';
import profile from '../assets/PROFILE.jpg';

const Passengers = ({ arrayOfUsers }) => {
	return (
		<div className="passengers">
			{!arrayOfUsers || arrayOfUsers.length === 0 ? (
				<span className="passengers-no-users">
					&#x26A0; No Users joined This Trip!
				</span>
			) : (
				arrayOfUsers.map((user) => {
					console.log(user);
					return (
						<div
							style={{ position: 'relative', zindex: -1 }}
							key={user._id}
						>
							<img
								src={!user.image ? profile : user.image}
								alt=""
							/>
						</div>
					);
				})
			)}
		</div>
	);
};

export default Passengers;
