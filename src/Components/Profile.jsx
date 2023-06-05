import React, { useState } from 'react';
import '../styles/profile.css';
import profile from '../assets/PROFILE.jpg';
import Cookies from 'js-cookie';
import { useAuthUser } from 'react-auth-kit';
import Swal from 'sweetalert2';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';

const Profile = () => {
	// const userData = Cookies.get('user') && JSON.parse(Cookies.get('user'));
	const userData = useAuthUser();
	let {
		first_name,
		last_name,
		joined_trips,
		hosted_trips,
		phone,
		_id,
		image,
	} = userData();
	const [cloudImageURL, setCloudImageURL] = useState(image);

	return (
		<div
			className="user-profile-card-container"
			style={{ paddingTop: '12vh' }}
		>
			<img src={!cloudImageURL ? profile : image} alt="user" />

			<div
				onClick={async () => {
					const { value: file } = await Swal.fire({
						title: 'Select image',
						input: 'file',
						inputAttributes: {
							accept: 'image/*',
							'aria-label': 'Upload your profile picture',
						},
					});
					if (file) {
						const reader = new FileReader();
						reader.onload = async (e) => {
							await Swal.fire({
								title: 'Your uploaded picture',
								imageUrl: e.target.result,
								imageAlt: 'The uploaded picture',
							});
						};
						const formData = new FormData();
						formData.append('image', file);

						axios
							.post(
								`${import.meta.env.VITE_IMGBB_URL}?key=${
									import.meta.env.VITE_IMAGE_BB_KEY
								}&image=${file.name}`,
								formData,
							)
							.then((response) => {
								response.status === 200 &&
									axios
										.put(
											`${
												import.meta.env.VITE_APP_URL
											}/api/user/update/${_id}`,
											{
												image: response.data.data.url,
											},
											{ new: true },
										)
										.then((res) => {
											console.log(res);
											setCloudImageURL(
												res.data.user.image,
											);
											console.log(res);
										});
							})

							.catch((err) => console.log(err.message));
						reader.readAsDataURL(file);
					}
				}}
			>
				<span style={{ textDecoration: 'underline' }}>
					Change Profile
				</span>
				<EditOutlinedIcon
					className="middle"
					style={{ fontSize: '30px', marginLeft: '10px' }}
				/>
			</div>
			<h3>
				{first_name} {last_name}
			</h3>
			<h6>PickMeUp user</h6>
			<h6>{phone}</h6>
			<p>
				<span>
					<strong>joined_trips</strong>
				</span>{' '}
				|{' '}
				<span>
					<strong>hosted_trips</strong> {hosted_trips.length}
				</span>
			</p>
		</div>
	);
};

export default Profile;
