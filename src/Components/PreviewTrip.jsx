import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../styles/previewTrip.css';

//icons
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import FlagIcon from '@mui/icons-material/Flag';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';

import { joinTrip } from '../App.jsx';
import { Grid } from '@mui/material';
import noImage from '../assets/PROFILE.jpg';
import Map from './Map.jsx';
import { useNavigate } from 'react-router-dom';

const PreviewTrip = ({
	tripID,
	previewExpanded,
	setPreviewExpanded,
	host_name,
	profile,
	vehicle_type,
	price,
	start_spot,
	end_spot,
	start_date,
	start_time,
	available_seats,
	isPreview,
	description, //to be passed to a children component
}) => {
	const origin = [
		start_spot && JSON.parse(start_spot).lat,
		start_spot && JSON.parse(start_spot).lng,
	]; // Replace with actual origin coordinates
	const destination = [
		end_spot && JSON.parse(end_spot).lat,
		end_spot && JSON.parse(end_spot).lng,
	]; // Replace with actual destination coordinates

	const userID = JSON.parse(Cookies.get('user'))._id;
	const navigate = useNavigate();
	const [detailsExpanded, setDetailsExpanded] = useState(false);

	return (
		<article
			className="trip-card"
			style={{
				marginTop: '3.5rem',
				borderRadius: '10px',
			}}
		>
			{isPreview && (
				<button
					onClick={() => {
						console.log('clicked');
						setPreviewExpanded(!previewExpanded);
					}}
					className="unset"
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						margin: '.5rem',
						zIndex: 8,
						color: 'black',
					}}
				>
					<CloseIcon />
				</button>
			)}

			<div
				className="trip-type-img"
				style={{
					backgroundColor: '#dfebff',
				}}
			>
				{vehicle_type == 'car' ? (
					<Grid
						style={{
							textAlign: 'center',
						}}
						className="trip-type-icon"
					>
						<DirectionsCarIcon style={{ color: 'orangered' }} />
					</Grid>
				) : vehicle_type == 'bus' ? (
					<Grid className="trip-type-icon">
						<DirectionsBusIcon style={{ color: '#126aff' }} />
					</Grid>
				) : vehicle_type == 'motorcycle' ? (
					<Grid
						style={{
							textAlign: 'center',
						}}
						className="trip-type-icon"
					>
						<TwoWheelerIcon />
					</Grid>
				) : (
					<Grid
						style={{
							textAlign: 'center',
						}}
						className="trip-type-icon"
					>
						<DirectionsBikeIcon />
					</Grid>
				)}
			</div>

			<div>
				<div
					style={{
						borderTopLeftRadius: '10px',
						borderTopRightRadius: '10px',
						overflow: 'hidden',
						width: '100%',
						height: '150px',
						position: 'absolute',
						top: 0,
						left: 0,

						zIndex: 0,
						backgroundColor: 'lightblue',
					}}
				>
					<Map origin={origin} destination={destination} />
				</div>
				<div
					style={{
						display: 'flex',
						margin: '10px 0 ',
						flexWrap: 'wrap',
						padding: '5rem 0.7rem 0rem 0.7rem',
						justifyContent: 'space-between',
						rowGap: '1rem',
					}}
				>
					<span style={{ flexBasis: '50%' }} className="block">
						<strong className="block">departure</strong>{' '}
						<PlaceIcon
							style={{
								verticalAlign: 'middle',
								color: 'brown',
							}}
						/>
						{start_spot && JSON.parse(start_spot).city}
					</span>

					<span style={{ flexBasis: '50%' }} className="block">
						<strong className="block">drop off</strong>{' '}
						<FlagIcon
							style={{
								verticalAlign: 'middle',
								color: '#191933',
							}}
						/>
						{end_spot && JSON.parse(end_spot).city}
					</span>
					<span className="block base-30 ">
						<strong className="block ">Host</strong>
						{host_name}
					</span>

					<span className="block base-30">
						<strong className="block">price </strong>{' '}
						{price == 0 ? 'free' : `${price} L.L`}
					</span>
					<span className="base-30 block">
						<strong
							className="block seat-available"
							// style={{ width: '30%' }}
						>
							available <br /> seats
						</strong>
						<span className="field-value">#{available_seats}</span>
					</span>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						padding: ' 0 0.7rem 0.7rem 0.7rem',
					}}
				>
					<span style={{ flexBasis: '50%' }}>
						<strong className="block">Start Date</strong>
						<span>
							<CalendarMonthIcon
								className="middle"
								style={{
									marginRight: '5px',
									fontSize: '1.2rem',
								}}
							/>
							{start_date}
						</span>
					</span>
					<span style={{ flexBasis: '50%' }}>
						<strong className="block">Start Time</strong>
						<span>
							<AccessTimeIcon
								className="middle"
								style={{
									marginRight: '5px',
									fontSize: '1.2rem',
								}}
							/>
							{start_time}
						</span>
					</span>
				</div>
				{!isPreview && (
					<div
						style={{
							width: '100%',
							padding: '1rem 0 ',
							borderTop: '1px solid lightgray',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<button
							onClick={() => {
								joinTrip({ trip_id: tripID, user_id: userID }); //userID
							}}
							className="join-trip unset"
							style={{
								color: 'white',
								backgroundColor: '#b266ec',
								padding: '10px 35px',
								borderRadius: '10px',
								margin: ' 0 10px ',
							}}
						>
							Join Trip!
						</button>
						<button
							className="more-info unset"
							style={{
								border: '1px solid lightgray',
								padding: '9px',
								borderRadius: '10px',
								color: '#191933',
							}}
							onClick={() => {
								console.log('clicked');
								navigate(`/trips/${tripID}`);
								setDetailsExpanded(!detailsExpanded);
							}}
						>
							<InfoIcon className="middle" />
						</button>
					</div>
				)}
			</div>
		</article>
	);
};

export default PreviewTrip;
