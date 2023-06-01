import React, { useEffect, useState } from 'react';
import PreviewTrip from '../Components/PreviewTrip.jsx';
import Sidebar from '../Components/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import lebaneseCities from '../assets/lb.json';

//icons
import PlaceIcon from '@mui/icons-material/Place';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from '../Components/Loader.jsx';

const Join = ({ getAllTrips, joinTrip }) => {
	const [trips, setTrips] = useState({});
	const [tripData, setTripData] = useState(null);

	const handleInputChange = (e) => {
		setTripData({ ...tripData, [e.target.name]: e.target.value });
	};
	console.log(tripData);
	useEffect(() => {
		getAllTrips(setTrips);
	}, []);

	return (
		<div className="join-trip-container" style={{ paddingBottom: '2rem' }}>
			<Outlet />
			<form
				style={{
					background: '#fff3cf',
					gap: '1rem',
					width: '96%',
					margin: '0 auto',
					borderRadius: '10px',
					flexWrap: 'nowrap',
				}}
				id="new-trip-form"
				className="new-trip-form"
			>
				<div style={{ flexBasis: '50%' }}>
					<label htmlFor="start_location">
						<span>Start</span>
						<select
							defaultValue={'tripoli'}
							name="start_location"
							onChange={handleInputChange}
							id="start_location"
						>
							{lebaneseCities.map(({ city, lng, lat }, index) => {
								return (
									<option
										key={index}
										value={JSON.stringify(
											lebaneseCities[index],
										)}
									>
										{city}
									</option>
								);
							})}
						</select>
					</label>
					<label htmlFor="end_location">
						<span>End</span>
						<select
							name="end_location"
							className="block "
							onChange={handleInputChange}
							id="end_location"
						>
							<option value={'Tripoli'}>Tripoli</option>
							{lebaneseCities.map(({ city }, index) => {
								return (
									<option
										key={index}
										value={JSON.stringify(
											lebaneseCities[index],
										)}
									>
										{city}
									</option>
								);
							})}
						</select>
					</label>
				</div>
				<div>
					<label htmlFor="date">
						<span>Trip Date</span>
						<input
							style={{ padding: ' 0 5px' }}
							className="block "
							onChange={handleInputChange}
							type="date"
							name="start_date"
							id="date"
						/>
					</label>

					<label htmlFor="vehicle_type" style={{ flexGrow: 1 }}>
						<span>Vehicle Type</span>
						<select
							className="block "
							onChange={handleInputChange}
							name="vehicle_type"
							id="vehicle_type"
						>
							<option value="car">Vehicle Type</option>
							<option value="car">Car</option>
							<option value="bus">Bus</option>
							<option value="motorcycle">Motorcycle</option>
							<option value="bicycle">bicycle</option>
						</select>
					</label>
				</div>
			</form>

			{trips.length === 0 ? (
				<Loader isComponent={true} />
			) : (
				trips.length > 0 &&
				trips
					.filter((trip) => {
						return !tripData
							? trips
							: trip.start_location === tripData.start_location ||
									trip.end_location ===
										tripData.end_location ||
									trip.vehicle_type ===
										tripData.vehicle_type ||
									trip.start_date === tripData.start_date;
					})

					.map(
						({
							_id,
							host_name,
							profile,
							approved_passengers,
							vehicle_type,
							cost,
							start_location,
							end_location,
							start_date,
							seats,
							description,
							start_time,
						}) => {
							return (
								<PreviewTrip
									setTrips={setTrips}
									tripID={_id}
									key={_id}
									start_time={start_time}
									vehicle_type={vehicle_type}
									price={cost}
									start_date={start_date}
									start_spot={start_location}
									end_spot={end_location}
									available_seats={seats}
									description={description}
									passengers={approved_passengers}
									host_name={host_name.first_name}
									profile={profile}
								/>
							);
						},
					)
			)}
			<Sidebar />
		</div>
	);
};

export default Join;
