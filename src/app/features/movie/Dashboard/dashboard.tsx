import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { useEffect } from 'react';
import React from 'react';
import { Row } from 'react-bootstrap';
import { movieActions, selectMovieList } from '../Redux/movieSlice';
import LIST_MOVIES from './components/listMovies';

interface Props {}

const MovieDashboard = (props: Props) => {
	const dispatch = useAppDispatch();
	const list = useAppSelector(selectMovieList);

	useEffect(() => {
		dispatch(
			movieActions.fetchMovieList({
				page: 1,
				per_page: 20,
			})
		);
	}, [dispatch]);

	return (
		<div>
			<Row sm={1} md={2} lg={4}>
				<LIST_MOVIES listMovie={list} />
			</Row>
		</div>
	);
};

export default MovieDashboard;
