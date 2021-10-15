import { blue } from '@ant-design/colors'
import { Button, Dropdown, Popconfirm, Space } from 'antd'
import { Category } from 'app/interfaces/category'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import TableBase from 'app/utils/components/TableBase'
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { categoryActions, selectCategoryFilter, selectCategoryList, selectCategoryListLoading, selectCategoryPagination } from '../../redux/categorySlice'

interface Props {
	onEdit: (category: Category) => void;
}

export const ListCategory = ({ onEdit }: Props) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategoryList);
    const loading = useAppSelector(selectCategoryListLoading);
    const filter = useAppSelector(selectCategoryFilter);
    const pagination = useAppSelector(selectCategoryPagination);

    React.useEffect(() => {
        dispatch(categoryActions.getList(filter))
    }, [dispatch, filter])

    const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize
        }
        dispatch(categoryActions.getList(newFilter));
    }

    const handleDelete = (category: Category) => {
        dispatch(categoryActions.deleteById(category));
    }
    
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Thể loại',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Đường dẫn',
			dataIndex: 'slug',
			key: 'slug',
		},
		{
			title: 'Ẩn Hiện',
			dataIndex: 'show',
			key: 'show',
		},
		{
			title: '',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (record: Category) => (
				<Dropdown
					overlay={
						<Space size="middle">
							<Button
								type="text"
								style={{ color: blue[3] }}
								onClick={() => onEdit(record)}
							>
								Sửa <AiOutlineEdit />
							</Button>
							<Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(record)}>
								<Button type="text" danger>
									Xóa <AiOutlineDelete />
								</Button>
							</Popconfirm>
						</Space>
					}
					trigger={['click']}
				>
					<Button style={{ margin: '0 auto' }}>
						<FiMoreHorizontal />
					</Button>
				</Dropdown>
			),
		},
	];

    return (
        categories && (
            <TableBase
                columns = {columns}
                dataSource = {categories}
                pagination = {pagination}
                onPageChange = {handlePageChange}
                loading = {loading}
            />
        )
    )
}
