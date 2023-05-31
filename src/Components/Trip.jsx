import React from 'react';

const Trip = ({
	host_name,
	passengers,
	approvedPassengers,
	start_location,
	end_location,
	start_date,
	available_seats,
	vehicle_type,
	cost,
	trip_type,
	description,
}) => {
	return (
		<article>
			<span>{vehicle_type}</span>
			<h2>{host_name}</h2>
			<span>{cost}</span>
			<p>{trip_type}</p>
			<time>{start_date}</time>
			<div>
				<span>{start_location}</span>
				<span>{end_location}</span>
			</div>
			<div>{passengers}</div>
			<div>{approvedPassengers}</div>
			<div>{available_seats}</div>
			{description && <p>{description}</p>}
		</article>
	);
};

export default Trip;
