import React, { useContext, useState } from 'react';
import { sidebarStatus } from '../App.jsx';
import StarIcon from '@mui/icons-material/Star';
import noImage from '../assets/PROFILE.jpg';


import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CommuteIcon from '@mui/icons-material/Commute';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Cookies from 'js-cookie';

const sideLinks = [
	{
		name: 'Home',
		icon: (
			<HomeRoundedIcon
				sx={{ verticalAlign: 'middle', marginBottom: '5px' }}
			/>
		),
		path: '/',
	},

	{
		name: 'Join Trip',
		icon: (
			<CommuteIcon
				sx={{ verticalAlign: 'middle	', marginBottom: '5px' }}
			/>
		),
		path: '/trips/join',
	},
	{
		name: 'Host Trip',
		icon: (
			<AddCircleIcon
				sx={{ verticalAlign: 'middle', marginBottom: '5px' }}
			/>
		),
		path: '/new',
	},
];
const Sidebar = ({ profile, rate }) => {
	const [sidebarExpanded, setSidebarExpanded] = useContext(sidebarStatus);
	const userData = JSON.parse(Cookies.get('user'));
	return (
		<div
			className={
				sidebarExpanded ? 'side-bar' : 'side-bar side-bar-collapsed'
			}
		>
			<div className="user-profile-overall">
				<button
					className="unset side-collapse-toggle"
					onClick={() => {
						setSidebarExpanded(!sidebarExpanded);
					}}
				>
					<CloseIcon />
				</button>
				<div className="user-image-container">
					<img src={!profile ? noImage : profile} alt="profile" />
				</div>
				<p>
					<span>{userData.first_name || 'Mahmoud'}</span> |{' '}
					<span>
						<strong> {rate || '4.3'}</strong>
					</span>
					<span>
						<StarIcon
							style={{
								verticalAlign: 'middle',
								fontSize: '1rem',
								marginBottom: '3px',
							}}
						/>
					</span>
				</p>
				<NavLink to={'/profile'}>Edit profile</NavLink>
			</div>
			<div
				className="links-container"
				style={{
					padding: '10px 0 10px 10px',
					height: '70%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<ul>
					{sideLinks.map(({ name, icon, path }, index) => {
						return (
							<li
								key={index}
								style={{ marginTop: ' 10px' }}
								onClick={() => {
									setSidebarExpanded(!setSidebarExpanded);
								}}
							>
								<NavLink
									to={path}
									style={{ textDecoration: 'none' }}
								>
									<span
										style={{
											color: '#191933',
											marginRight: '5px',
										}}
									>
										{icon}
									</span>
									<span style={{ color: '#191933' }}>
										{name}
									</span>
								</NavLink>
							</li>
						);
					})}
					<hr />
					<li style={{ marginTop: '.6rem' }}>
						<NavLink
							onClick={() => {
								setSidebarExpanded(!setSidebarExpanded);
							}}
							to="/trips/hosted"
							style={{ color: '#191933' }}
						>
							Hosted Trips
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/joined"
							style={{ color: '#191933' }}
							onClick={() => {
								setSidebarExpanded(!setSidebarExpanded);
							}}
						>
							Joined Trips
						</NavLink>
					</li>
				</ul>
				<button
					className="unset"
					style={{ marginTop: 'auto' }}
					onClick={() => {
						setSidebarExpanded(!setSidebarExpanded);
					}}
				>
					<ExitToAppIcon sx={{ verticalAlign: 'middle	' }} />
					signOut
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
