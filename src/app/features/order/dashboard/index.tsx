import { Col, Row } from 'antd'
import { FilterOrder } from './components/FilterOrder'
import { ListOrder } from './components/ListOrder'

interface Props {
    
}

export const orderDashboard = (props: Props) => {
    return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<FilterOrder />
			</Col>
			<Col span={24}>
				<ListOrder/>
			</Col>
		</Row>
    )
}
