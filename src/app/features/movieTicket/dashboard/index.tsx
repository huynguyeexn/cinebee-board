import { Col, Row } from 'antd'
import React from 'react'
import { FilterMovieTicket } from './components/FilterMovieTicket'
import { ListMovieTicket } from './components/ListMovieTicket'

interface Props {
    
}

export const index = (props: Props) => {
    return (
        <Row gutter={[16, 16]}>
			<Col span={24}>
				<FilterMovieTicket />
			</Col>
			<Col span={24}>
				<ListMovieTicket/>
			</Col>
		</Row>
    )
}
