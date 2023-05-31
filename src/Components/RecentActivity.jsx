import React from 'react';
import '../styles/recentActivity.css';
import PlaceIcon from '@mui/icons-material/Place';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';

export default function RecentActivity({
	start_location,
	end_location,
	date,
	time,
}) {
	return (
		<div className="recent-activity">
			<div className="recent-activity-top">
				<div className="recent-activity-icon-container">
					<PlaceIcon />
					<span style={{ marginLeft: '5px' }}>{start_location}</span>
				</div>
			</div>
			<p className="recent-activity-date">
				{date}
				<br /> {time}
			</p>
			<div className="recent-activity-top" style={{ marginTop: '10px' }}>
				<div className="recent-activity-icon-container">
					<AssistantPhotoIcon />
					<span style={{ marginLeft: '5px' }}>{end_location}</span>
				</div>
			</div>
		</div>
	);
}
