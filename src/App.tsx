import { Redirect, Route, Switch } from 'react-router-dom';
import './App.less';

function App() {
	return (
		<Switch>
			<Route path="/login">Login page</Route>
			<Route path="/admin">Admin page</Route>
			<Redirect from="/" to="/login" />
			<Route>Not found</Route>
		</Switch>
	);
}

export default App;
