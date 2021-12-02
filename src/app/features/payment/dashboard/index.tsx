import { Col, Modal, Row } from 'antd';
import React from 'react'
import FilterPayment from './components/FilterPayment';
import { ListPayment } from './components/ListPayment';

interface Props {
    
}

export const PaymentDashboardPage = (props: Props) => {
    return (
        <Row gutter={[16, 16]}>
			<Col span={24}>
				<FilterPayment />
			</Col>
			<Col span={24}>
				<ListPayment/>
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				title={false}
				footer={null}
			>
			</Modal>
		</Row>
    )
}
