import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { redirect, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import carpooling_image from '../../src/assets/carpool-concept-illustration_114360-9258.avif';

import '../styles/login.css';

import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();
	const signIn = useSignIn();
	const nodeEnv = import.meta.env.VITE_APP_URL;
	const [hasAccount, setHasAccount] = useState(true);
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(false);
	const handleInputChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const Toast = Swal.mixin({
		toast: true,
		position: 'bottom',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer);
			toast.addEventListener('mouseleave', Swal.resumeTimer);
		},
	});
	const addNewUser = () => {
		axios
			.post(`${nodeEnv}/api/user/create`, {
				phone: userData.phone,
				password: userData.password,
				first_name: userData.first_name,
				last_name: userData.last_name,
			})
			.then((res) => {
				console.log(res);
				if (res.data.error) {
					Toast.fire({
						icon: 'error',
						title: 'already exists',
					});
				}
				Toast.fire({
					icon: 'success',
					title: 'Welcome to PickmeuP',
				});

				res.status == 200 && navigate('/');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const loginUSer = () => {
		axios
			.post(`${nodeEnv}/api/user/login`, userData)
			.then((res) => {
				console.log(res);
				res.status === 200 && setLoading(false);
				if (
					signIn({
						token: res.data.token,
						expiresIn: 120,
						tokenType: 'Bearer',
						authState: res.data.response,
					})
				) {
					navigate('/');
				} else {
					alert('wrong creds');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const rediretUser = () => {
		const authData = { phone: userData.phone, password: userData.password };
		setUserData(authData);
		axios
			.post(`${nodeEnv}/api/user/create`, {
				phone: userData.phone,
				password: userData.password,
				first_name: userData.first_name,
				last_name: userData.last_name,
			})
			.then((res) => {
				console.log(res);
				if (res.data.error) {
					Toast.fire({
						icon: 'error',
						title: 'already exists',
					});
				}
				res.status == 200 &&
					Toast.fire({
						icon: 'success',
						title: 'Welcome to PickmeuP',
					});

				loginUSer();
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	const checkPasswordMatch = (e) => {
		e.preventDefault();
		if (
			userData.password == '' ||
			userData.passwordRepeat == '' ||
			!userData.password ||
			!userData.passwordRepeat
		) {
			Toast.fire({
				icon: 'error',
				title: 'All Fields are required',
			});
		} else if (userData.password !== userData.passwordRepeat) {
			Toast.fire({
				icon: 'error',
				title: 'Password mismatch',
			});
		}
	};
	const switchers = [...document.querySelectorAll('.switcher')];
	switchers.forEach((item) => {
		item.addEventListener('click', function () {
			switchers.forEach((item) =>
				item.parentElement.classList.remove('is-active'),
			);
			this.parentElement.classList.add('is-active');
		});
	});
	console.log(userData);

	return !hasAccount ? (
		<>
			<h1 className="center title">Welcome To Pickmeup!</h1>
			<div className="login-container">
				<div className="window">
					<div className="overlay" />
					<form className="content">
						<div
							className="subtitle"
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '60px',
								backgroundColor: '#b266ec',
								fontWeight: '300',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							Register
						</div>
						<div className="input-fields">
							<input
								onChange={handleInputChange}
								name="first_name"
								type="text"
								placeholder="first name"
								className="input-line full-width"
							/>
							<input
								onChange={handleInputChange}
								name="last_name"
								type="text"
								placeholder="last name"
								className="input-line full-width"
							/>
							<input
								onChange={handleInputChange}
								name="phone"
								type="text"
								placeholder="Phone number"
								className="input-line full-width"
							/>
							<input
								onChange={handleInputChange}
								name="password"
								type="password"
								placeholder="Password"
								className="input-line full-width"
							/>
							<input
								onChange={handleInputChange}
								name="passwordRepeat"
								type="password"
								placeholder="Re-enter Password"
								className="input-line full-width"
							/>
						</div>
						<div className="spacing">
							already have an account?
							<button
								style={{
									all: 'unset',
									fontWeight: 400,
									cursos: 'pointer',
								}}
								onClick={() => {
									setHasAccount(!hasAccount);
								}}
								className="highlight"
							>
								Login
							</button>
							<button
								type="submit"
								className="ghost-round full-width"
								onClick={(e) => {
									checkPasswordMatch(e);

									rediretUser();
								}}
							>
								Create Account
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	) : (
		<>
			<div className="login-container">
				<h1 className="center title">Welcome !</h1>
				<form
					className="window"
					onSubmit={(e) => {
						e.preventDefault();
						loginUSer();
						setLoading(true);
					}}
				>
					<div className="overlay" />
					<div className="content">
						<div
							className="subtitle"
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '60px',
								backgroundColor: '#b266ec',
								fontWeight: '300',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							Login
						</div>
						<div className="input-fields">
							<input
								onChange={handleInputChange}
								type="text"
								name="phone"
								placeholder="Phone number"
								className="input-line full-width"
							/>

							<input
								onChange={handleInputChange}
								name="password"
								type="password"
								placeholder="Re-enter Password"
								className="input-line full-width"
							/>
						</div>
						<div className="spacing">
							didn't Register yet?
							<button
								type="button"
								className="highlight"
								style={{
									all: 'unset',
									fontWeight: 400,
									cursos: 'pointer',
								}}
								onClick={() => {
									setHasAccount(!hasAccount);
								}}
							>
								Join now !
							</button>
							<button
								type="submit"
								disabled={loading && true}
								className="ghost-round full-width"
								style={{
									backgroundColor: loading && 'lightgray',
									color: loading && 'white',
									border: loading && 0,
								}}
							>
								Login
							</button>
						</div>
					</div>
				</form>
				<div className="illustration">
					<img src={carpooling_image} />
				</div>
			</div>
		</>
	);
};

export default Login;
