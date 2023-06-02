import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider
		authType={'localstorge'}
		authName={'_auth'}
		cookieDomain={window.location.hostname}
		cookieSecure={window.location.protocol === 'https:'}
	>
		<App />
	</AuthProvider>,
);
