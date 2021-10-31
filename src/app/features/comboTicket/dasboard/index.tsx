import { Col, Row } from 'antd'
import React from 'react'
import { FilterComboTicket } from './components/FilterComboTicket'
import { ListComboTicket } from './components/ListComboTicket'

interface Props {
    
}

export const ComboTicketDashboard = (props: Props) => {
    return (
        <Row gutter={[16, 16]}>
			<Col span={24}>
				<FilterComboTicket />
			</Col>
			<Col span={24}>
				<ListComboTicket/>
			</Col>
		</Row>
    )
}
