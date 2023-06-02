import React from 'react';
import '../styles//Loader.css';

const Loader = ({ component_loading, width, height }) => {
	return (
		<div
			className="loader-container"
			style={{
				height: component_loading && '50vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<span className="loader"></span>
		</div>
	);
};

export default Loader;
