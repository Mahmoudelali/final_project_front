import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const Map = ({ origin, destination }) => {
	const polylineOptions = { color: 'red' };
	const polylinePositions = [origin, destination];

	return (
		<MapContainer center={origin} zoom={20}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Polyline
				pathOptions={polylineOptions}
				positions={polylinePositions}
			/>
		</MapContainer>
	);
};

export default Map;
