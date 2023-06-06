import { Outlet, NavLink } from 'react-router-dom';
import { sidebarStatus } from '../App';
import { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import pickmeup_violet from '../assets/pickmeup logo variations -06.svg';
import Sidebar from './Sidebar';

// icons

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CloseIcon from '@mui/icons-material/Close';
import CommuteIcon from '@mui/icons-material/Commute';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HandshakeIcon from '@mui/icons-material/Handshake';

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
	{
		name: 'Hosted Trips',
		icon: (
			<HandshakeIcon
				sx={{ verticalAlign: 'middle', marginBottom: '5px' }}
			/>
		),
		path: '/trips/hosted',
	},
	// {
	// 	name: 'joined Trips',
	// 	icon: (
	// 		<GroupsIcon sx={{ verticalAlign: 'middle', marginBottom: '5px' }} />
	// 	),
	// 	path: '/trips/joined',
	// },
	{
		name: 'Pending Requests',
		icon: <MoreHorizIcon className="middle" />,
		path: '/trips/requests',
	},
];

function Layout() {
	const [sidebarExpanded, setSidebarExpanded] = useContext(sidebarStatus);

	return (
		<>
			<header>
				<button
					onClick={() => {
						setSidebarExpanded(!sidebarExpanded);
					}}
					className="toggle-icons unset"
				>
					{!sidebarExpanded ? <MenuIcon /> : <CloseIcon />}
				</button>
				<div className="brand-container">
					<img src={pickmeup_violet} alt="brand image" />
				</div>
				<nav className="nav-links">
					{sideLinks.map(({ name, icon, path }, index) => {
						return (
							<NavLink
								key={index}
								to={path}
								style={{ textDecoration: 'none' }}
							>
								{name}
							</NavLink>
						);
					})}
				</nav>
			</header>
			<Sidebar />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
