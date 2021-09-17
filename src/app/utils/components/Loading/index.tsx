import React from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {}

export const LOADING = (props: Props) => {
	return (
		<div className="tw-w-full tw-flex tw-justify-center tw-items-center">
			<Spinner
				className="mr-2"
				size="sm"
				style={{ animationDelay: '0.15s' }}
				animation="grow"
				variant="primary"
			/>
			<Spinner
				className="mr-2"
				size="sm"
				style={{ animationDelay: '0.3s' }}
				animation="grow"
				variant="primary"
			/>
			<Spinner
				className="mr-2"
				size="sm"
				style={{ animationDelay: '0.45s' }}
				animation="grow"
				variant="primary"
			/>
			<Spinner
				className="mr-2"
				size="sm"
				style={{ animationDelay: '0.6s' }}
				animation="grow"
				variant="primary"
			/>
			<Spinner
				className="mr-2"
				size="sm"
				style={{ animationDelay: '0.75s' }}
				animation="grow"
				variant="primary"
			/>
		</div>
	);
};
