import { Movie } from 'app/interfaces/movie';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface Props {
	listMovie?: Movie[];
}

const LIST_MOVIES = ({ listMovie }: Props) => {
	return (
		<>
			{listMovie &&
				listMovie.map((movie) => (
					<Col>
						<Card className="mb-4">
							<Card.Img variant="top" src={movie.thumbnail} />
							<Card.Body>
								<Card.Title>
									<NavLink to={`/admin/movies/${movie.id}`}>{movie.name}</NavLink>
								</Card.Title>
								<Card.Text className="tw-line-clamp-2">{movie.description}</Card.Text>
								<p>{movie.release_date}</p>
							</Card.Body>
						</Card>
					</Col>
				))}
		</>
	);
};

export default LIST_MOVIES;
