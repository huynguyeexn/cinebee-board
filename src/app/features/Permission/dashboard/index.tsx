import { Col, Row, Button, Modal } from 'antd';
import AddEditActor from 'app/features/actors/dashboard/components/AddEditActor';
import FilterActor from 'app/features/actors/dashboard/components/FIlterActor';
import ListActor from 'app/features/actors/dashboard/components/ListActor';
import { Actor } from 'app/interfaces';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import ListPermisson from './components/ListPermisson';
import { Permission } from 'app/interfaces/Permission';

interface Props {}

const PermissionDashboad = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [data, setData] = React.useState<Actor>();

	const handleAddButtonClick = () => {
		setIsOpenModal(true);
	};

	const handleCancel = () => {
		setData(undefined);
		setIsOpenModal(false);
		setIsEdit(false);
	};

	const handleEdit = (pe: Permission) => {
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
                Thêm nhóm quyền
            </Button>
        </Col>
        <Col span={24}>
            <FilterActor />
        </Col>
        <Col span={24}>
            {/* <ListActor onEdit={handleEdit} /> */}
            <ListPermisson onEdit={handleEdit} />
        </Col>
        {/* Add edit */}
        <Modal
            centered={true}
            closable={false}
            visible={isOpenModal}
            title={false}
            footer={null}
        >
            <AddEditActor onCancel={handleCancel} isEdit={isEdit} data={data} />
        </Modal>
    </Row>
    )
}

export default PermissionDashboad;
