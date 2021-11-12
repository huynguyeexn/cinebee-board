import { Button, Col, Modal, Row } from 'antd';
import { Item } from 'app/interfaces/item';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import FilterItem from './components/FilterItem';
import ListItem from './components/ListItem';
import AddEditItem from './components/AddEditItem';

interface Props {};

const ItemDashboardPage = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [data, setData] = React.useState<Item>();

    const handleAddButtonClick = () => {
        setIsOpenModal(true);
    };

    const handleCancel = () => {
        setData(undefined);
        setIsOpenModal(false);
        setIsEdit(false);
    };

    const handleEdit = (item: Item) => {
        setData(item);
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
					Thêm Sản Phẩm
				</Button>
			</Col>
			<Col span={24}>
				<FilterItem />
			</Col>
			<Col span={24}>
				<ListItem onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				visible={isOpenModal}
				title={false}
				footer={null}
			>
				<AddEditItem onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
		</Row>
	);
};

export default ItemDashboardPage;