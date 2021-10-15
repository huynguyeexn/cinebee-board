import { Button, Col, Modal, Row } from 'antd'
import { EmployeeRole } from 'app/interfaces'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AddEditEmployeeRole } from './components/AddEditEmployeeRole'
import { FilterEmployeeRole } from './components/FilterEmployeeRole'
import { ListEmployeeRole } from './components/ListEmployeeRole'

interface Props {
    
}

export const EmployeeRoleDashboardPage = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [data, setData] = React.useState<EmployeeRole>();

    const handleAddButtonClick = () => {
        setIsOpenModal(true);
    }

    const handleCancel = () => {
        setData(undefined);
        setIsOpenModal(false);
        setIsEdit(false);
    }

    const handleEdit = (employeeRole: EmployeeRole) => {
        setData(employeeRole);
        setIsOpenModal(true);
        setIsEdit(true);
    }

    return (
        <Row gutter={[16,16]}>
			<Col span={24}>
				<FilterEmployeeRole />
			</Col>
            <Col span={24}>
				<Button
					icon={<AiOutlinePlus />}
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
					onClick={handleAddButtonClick}
				>
					Thêm chức vụ
				</Button>
			</Col>
            {/* List Table */}
			<Col span={24}>
				<ListEmployeeRole onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				visible={isOpenModal}
				title={false}
				footer={null}
			>
				<AddEditEmployeeRole onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
        </Row>
    )
}

export default EmployeeRoleDashboardPage