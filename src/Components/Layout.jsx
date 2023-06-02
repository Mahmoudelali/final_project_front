import { Outlet } from 'react-router-dom';
import { sidebarStatus } from '../App';
import { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import pickmeup_violet from '../assets/pickmeup logo variations -06.svg';

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
					<img src={pickmeup_violet} alt="" />
				</div>
			</header>

			<main>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
