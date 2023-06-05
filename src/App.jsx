import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';

import axios from 'axios';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Welcome from './Components/Welcome.jsx';
import NewTrip from './Components/NewTrip.jsx';

// authentication kit

import './App.css';
import React, { useState } from 'react';
import Join from './pages/Join.jsx';
import Profile from './Components/Profile.jsx';

import TripDetails from './Components/Trip_Details.jsx';
import HostedTrips from './Components/HostedTrips.jsx';
import Layout from './Components/Layout.jsx';

import Swal from 'sweetalert2';
import Pending from './Components/Pending.jsx';

export const sidebarStatus = React.createContext();

const Toast = Swal.mixin({
	toast: true,
	position: 'center',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
	},
});

export const joinTrip = ({ trip_id, user_id }) => {
	axios
		.post(
			`${import.meta.env.VITE_APP_URL}/api/trips/${trip_id}/passengers`,
			{
				passengerId: user_id,
			},
		)
		.then((res) => {
			console.log(res);
			res.status === 200 &&
				Toast.fire({
					icon: 'success',
					title: 'Join Request Sent!',
				});
		})
		.catch((err) => {
			Toast.fire({
				icon: 'warning',
				title: err.response.data.error,
			});
			console.log(err);
		});
};
export const getAllTrips = (handler) => {
	axios
		.get(`${import.meta.env.VITE_APP_URL}/api/trips/`)
		.then((res) => {
			console.log(res.data.trips);

			handler(res.data.trips);
		})
		.catch((err) => console.log(err));
};
export const getTripByID = ({ trip_id, stateHandler }) => {
	axios
		.get(`${import.meta.env.VITE_APP_URL}/api/trips/${trip_id}`)
		.then((res) => {
			stateHandler(res.data.trip);
		})
		.catch((err) => console.log(err));
};
const createTrip = (e, trip_data, form) => {
	e.preventDefault();
	axios
		.post(`${import.meta.env.VITE_APP_URL}/api/trips/create`, trip_data)
		.then((res) => {
			(res.status === 200) &
				Toast.fire({
					icon: 'success',
					title: 'Trip Added Successfully',
				});
			form.reset();
			getAllTrips();
		})
		.catch((err) => {
			Toast.fire({
				icon: 'warning',
				title: `${err.message}`,
			});
			console.log(err);
		});
};
const approvePassenger = (trip_id, user_id) => {
	axios
		.post(`${import.meta.env.VITE_APP_URL}/api/trips/${trip_id}/approve`, {
			passengerId: user_id,
		})
		.then((res) => {
			console.log(res);
			getAllTrips();
		})
		.catch((err) => console.log(err));
};
export const getAllPending = (trip_id, handler) => {
	axios
		.get(`${import.meta.env.VITE_APP_URL}/api/trips/${trip_id}/requests`)
		.then((res) => {
			console.log(res.data);
			handler(res.data);
		})
		.catch((err) => console.log(err));
};
const deleteTrip = (trip_id) => {
	axios
		.delete(`${import.meta.env.VITE_APP_URL}/api/trips/${trip_id}`)
		.then((res) => {
			console.log(res);
			getAllTrips();
		})
		.catch((err) => console.log(err));
};
const updateTrip = (trip_id, data) => {
	axios
		.put(`${import.meta.env.VITE_APP_URL}/api/trips/${trip_id}`, data)
		.then((res) => {
			console.log(res);
			getAllTrips();
		})
		.catch((err) => console.log(err));
};
export const getUserById = (id) => {
	try {
		axios
			.get(`${import.meta.env.VITE_APP_URL}/api/user/${id}`)
			.then((response) => {
				console.log(response.data.message);
			});
	} catch (error) {
		console.log(error);
	}
};
export const getTripsByUserID = (id, handler) => {
	axios
		.get(`${import.meta.env.VITE_APP_URL}/api/user/${id}`)
		.then((response) => {
			console.log(response.data.message.hosted_trips);
			handler(response.data.message.hosted_trips);
		});
};
function App() {
	const [sidebarExpanded, setSidebarExpanded] = useState(false);
	return (
		<div className="homepage-container">
			<sidebarStatus.Provider
				value={[sidebarExpanded, setSidebarExpanded]}
			>
				<AuthProvider
					authType={'localstorge'}
					authName={'_auth'}
					cookieDomain={window.location.hostname}
					cookieSecure={window.location.protocol === 'https:'}
				>
					<BrowserRouter>
						<Routes>
							<Route exact path="/login" element={<Login />} />

							<Route
								path="/"
								exact
								element={
									<RequireAuth loginPath="/login">
										<Layout />
									</RequireAuth>
								}
							>
								<Route
									path="/"
									element={<Home getAllTrips={getAllTrips} />}
								/>
								<Route
									path="/new"
									element={
										<NewTrip createTrip={createTrip} />
									}
								/>
								<Route path="/profile" element={<Profile />} />
								<Route
									path="/trips/join"
									element={<Join getAllTrips={getAllTrips} />}
								></Route>
								<Route
									path="/trips/hosted"
									element={<HostedTrips />}
								></Route>
								<Route
									path="/trips/:id"
									element={<TripDetails />}
								/>
								<Route
									path="/trips/requests"
									element={<Pending />}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</sidebarStatus.Provider>
		</div>
	);
}

export default App;
{
	/* MyCollection.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } }
    ]
  }) */
}
