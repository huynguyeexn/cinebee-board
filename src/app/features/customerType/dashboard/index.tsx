import { Button, Col, Modal, Row } from 'antd';
import { CustomerType } from 'app/interfaces';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { AddEditCustomerType } from './components/AddEditCustomerType';
import { FilterCustomerType } from './components/FilterCustomerType';
import { ListCustomerType } from './components/ListCustomerType';

interface Props {
    
}

export const CustomerTypeDashboardPage = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false)
	const [isEdit, setIsEdit] = React.useState(false);
	const [data, setData] = React.useState<CustomerType>();

	const handleAddButtonClick = () => {
		setIsOpenModal(true);
	};

	const handleCancel = () => {
		setData(undefined);
		setIsOpenModal(false);
		setIsEdit(false);
	};

	const handleEdit = (customerType: CustomerType) => {
		setData(customerType);
		setIsOpenModal(true);
		setIsEdit(true);
	};
    return (
        <Row gutter={[16, 16]}>
			<Col span={24}>
				<Button
					icon={<AiOutlinePlus />}
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
					onClick={handleAddButtonClick}
				>
					Thêm Loại Khách Hàng
				</Button>
			</Col>
			<Col span={24}>
				<FilterCustomerType />
			</Col>
			<Col span={24}>
				<ListCustomerType onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				visible={isOpenModal}
				title={false}
				footer={null}
			>
				<AddEditCustomerType onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
		</Row>
    )
}
