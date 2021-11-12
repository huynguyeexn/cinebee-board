import { Button, Col, Modal, Row } from 'antd';
import { Category } from 'app/interfaces/category';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { AddEditCategory } from './components/AddEditCategory';
import { FilterCategory } from './components/FilterCategory';
import { ListCategory } from './components/ListCategory';


const CategoryDashboardPage = () => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const  [data, setData ] = React.useState<Category>();
    const [isEdit, setIsEdit] = React.useState(false);

    const handleAddButtonClick = () => {
        setIsOpenModal(true)
    }

    const handleCancel = () => {
        setIsOpenModal(false);
        setData(undefined);
        setIsEdit(false);
    }

    const handleEdit = (category: Category) => {
        setIsOpenModal(true);
        setData(category);
        setIsEdit(true);
    }
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
					Thêm thể loại bài viết
				</Button>
			</Col>
			<Col span={24}>
				<FilterCategory />
			</Col>
			<Col span={24}>
				<ListCategory onEdit={handleEdit} />
			</Col>
			{/* Add edit */}
			<Modal
				centered={true}
				closable={false}
				visible={isOpenModal}
				title={false}
				footer={null}
			>
				<AddEditCategory onCancel={handleCancel} isEdit={isEdit} data={data} />
			</Modal>
		</Row>
    )
}

export default CategoryDashboardPage;
