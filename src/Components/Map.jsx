import React, { useEffect, useRef, useState } from 'react';

const Map = ({ origin, destination }) => {
	const googleMapRef = useRef(null);
	const [map, setMap] = useState(null);

	useEffect(() => {
		const googleMap = initGoogleMap();
		setMap(googleMap);
	}, []);

	useEffect(() => {
		if (!map) return;

		var directionsService = new window.google.maps.DirectionsService();
		var directionsRenderer = new window.google.maps.DirectionsRenderer();

		var start = new window.google.maps.LatLng(origin[0], origin[1]);
		var end = new window.google.maps.LatLng(destination[0], destination[1]);

		var request = {
			origin: start,
			destination: end,
			travelMode: 'WALKING',
		};
		directionsService.route(request, function (response, status) {
			if (status == 'OK') {
				directionsRenderer.setDirections(response);
				directionsRenderer.setMap(map);
			}
		});
	}, [map]);

	const initGoogleMap = () => {
		return new window.google.maps.Map(googleMapRef.current, {
			// center: new window.google.maps.LatLng(37.7699298, -122.4469157),	
			zoom: 0,
		});
	};

	return <div ref={googleMapRef} style={{ width: 600, height: 500 }} />;
};

export default Map;
