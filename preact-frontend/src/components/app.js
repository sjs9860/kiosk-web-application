import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import Sidebar from './sidebar';

const App = () => (
	<div id="app" className='flex'>
		<Sidebar />
		<main>
			<Router>
				<Home path="/" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
			</Router>
			<h1 className="text-3xl font-bold underline">
				Hello world!
			</h1>
		</main>
	</div>
);

export default App;
