import React from 'react';
import '../styles/welcome.css';
import carpooling_image from '../../src/assets/41.svg';
import pickmeup_charcoal from '../assets/pickmeup logo variations -03.svg';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
	const navigate = useNavigate();
	return (
		<div className="welcome-container">
			<h1>Welcome</h1>
			<div className="illustration-container">
				<img src={carpooling_image} alt="carpooling" />
			</div>
			<div className="logo-container">
				<img src={pickmeup_charcoal} alt="" />
			</div>
			<button
				onClick={() => {
					navigate('/login');
				}}
				style={{ all: 'unset' }}
			>
				Continue!
			</button>
		</div>
	);
};

export default Welcome;
