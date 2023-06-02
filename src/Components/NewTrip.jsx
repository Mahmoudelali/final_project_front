import React, { useState } from 'react';
import Cookies from 'js-cookie';
import PlaceIcon from '@mui/icons-material/Place';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PreviewTrip from './PreviewTrip.jsx';
import lebaneseCities from '../assets/lb.json';
import Sidebar from './Sidebar.jsx';
import Passengers from './Passengers.jsx';
import '../styles/test.css';
import { useAuthUser } from 'react-auth-kit';

const NewTrip = ({ createTrip }) => {
	const userInfo = useAuthUser()
	const [previewExpanded, setPreviewExpanded] = useState(false);
	const [free, setFree] = useState(true);

	const [tripData, setTripData] = useState({
		host_name: userInfo()._id,
		start_location: ``,
		end_location: ``,
		start_date: Date.now(),
		available_seats: 0,
		vehicle_type: '',
		description: ``,
		cost: 0,
	});

	console.log(tripData);

	const handleInputChange = (e) => {
		setTripData({ ...tripData, [e.target.name]: e.target.value });
	};

	const {
		start_location,
		end_location,
		start_date,
		seats,
		vehicle_type,
		description,
		cost,
		start_time,
	} = tripData;

	return (
		<div>
			{/* <Passengers /> */}
			<Sidebar />
			<div
				className={
					previewExpanded
						? 'preview-container'
						: 'preview-container preview-container-shrinked'
				}
			>
				<PreviewTrip
					setPreviewExpanded={setPreviewExpanded}
					previewExpanded={previewExpanded}
					host_name={userInfo().first_name}
					profile={'profile'}
					approved_passengers={5}
					vehicle_type={vehicle_type}
					price={cost}
					start_time={start_time}
					start_spot={start_location}
					end_spot={end_location}
					start_date={start_date}
					seats={seats}
					description={description}
					isPreview={true}
				/>
			</div>

			<form
				id="new-trip-form"
				className="new-trip-form"
				onSubmit={(e) => {
					createTrip(
						e,
						tripData,
						document.getElementById('new-trip-form'),
					);
				}}
			>
				<fieldset>
					<legend>
						<PlaceIcon
							style={{ color: 'brown', verticalAlign: 'middle' }}
						/>
						Location
					</legend>
					<label htmlFor="">
						<span>Start</span>
						<select
							name="start_location"
							className="block "
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
				</fieldset>

				<fieldset>
					<legend>
						<AttachMoneyIcon
							style={{ color: 'green', verticalAlign: 'middle' }}
						/>
						Pricing
					</legend>
					<label htmlFor="cost">
						<select
							name="value"
							id="cost"
							onChange={() => {
								setFree(!free);
							}}
						>
							<option value="free">Free</option>
							<option value="paid">Paid</option>
						</select>
					</label>
					{!free && (
						<label htmlFor="price">
							<span>Price</span>
							<input
								className="block "
								type="number"
								name="cost"
								onChange={handleInputChange}
							/>
						</label>
					)}
				</fieldset>

				<fieldset>
					<legend>
						<DescriptionIcon
							style={{
								color: '#b266ec',
								verticalAlign: 'middle',
							}}
						/>
						Details
					</legend>
					<label htmlFor="date" style={{ gridArea: '1/1/1/5' }}>
						<span>Date</span>
						<input
							className="block "
							onChange={handleInputChange}
							type="date"
							name="start_date"
							id="date"
						/>
					</label>
					<label htmlFor="time" style={{ gridArea: '1/5/1/-1' }}>
						<span>Time</span>
						<input
							className="block "
							onChange={handleInputChange}
							type="time"
							name="start_time"
							id="date"
						/>
					</label>

					<label
						htmlFor="vehicle_type"
						style={{
							display: 'inline',
							flexBasis: '100%',
							gridArea: '2/1/2/5',
						}}
					>
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

					<label
						htmlFor="seats"
						style={{
							display: 'inline-block',
							marginLeft: '10px',
							width: '100%',
							overflow: 'hidden',
							gridArea: '2/5/2/8',
						}}
					>
						<span className="block">
							<strong>#</strong>Seats
						</span>
						<input
							type="number"
							onChange={handleInputChange}
							name="seats"
							id="available_seats"
						/>
					</label>

					<label htmlFor="desc" style={{ gridArea: '3/1/3/-1' }}>
						description (optional)
						<textarea
							className="block "
							onChange={handleInputChange}
							name="description"
							id="desc"
							style={{ width: '100%' }}
						></textarea>
					</label>
				</fieldset>
				<div
					style={{
						flexBasis: '100%',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<button
						type="button"
						className="unset "
						onClick={() => {
							setPreviewExpanded(!previewExpanded);
						}}
						style={{
							marginRight: '5px',
							backgroundColor: '#191933',
						}}
					>
						<VisibilityIcon
							className="middle"
							sx={{ fontSize: '24px' }}
						/>
					</button>
					<button
						type="submit"
						className="unset"
						style={{
							flexBasis: '100%',
						}}
					>
						Publish Trip!
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewTrip;
