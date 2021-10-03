
import TableBase from 'app/utils/components/TableBase';
import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { selectPermissonList, 
    selectPermissonListLoading,
    PermissionActions, 
    selectPermissonPagination,
    selectPermissonFilter 
} from './../../redux/PermissionSlide';
import { Permission } from 'app/interfaces/Permission';
import { Dropdown, Space, Button, Popconfirm } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { blue } from '@ant-design/colors';
import moment from 'moment';

interface Props {
    onEdit: (Pe: Permission) => void;
}

const ListPermisson = ({ onEdit }: Props) => {
   const dispatch = useAppDispatch();
   const Permission =  useAppSelector(selectPermissonList);
   const loading = useAppSelector(selectPermissonListLoading);
   const pagination = useAppSelector(selectPermissonPagination);
   const filter = useAppSelector(selectPermissonFilter);


   React.useEffect(()=>{
    dispatch(PermissionActions.getList(filter));
   },[dispatch,filter]);


   const handlePageChange = (page: number, pageSize?: number) => {
       const newFilter = {
           ...filter,
           page: page,
           per_page: pageSize
       }
       dispatch(PermissionActions.setFilter(newFilter));
   }
   const handleDelete = (pe: Permission) => {

   }
   

   const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 65,
    },
    {
        title: 'Quyền',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Tên chi tiết quyền',
        dataIndex: 'display_name',
        key: 'display_name',
    },
    {
        title: 'Cập nhật',
        key: 'updated_at',
        dataIndex: 'updated_at',
        render: (text: string) => <span>{moment(text).fromNow()}</span>,
    },
    {
        title: '...',
        key: 'action',
        fixed: 'right',
        width: 65,
        render: (record: Permission) => (
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
    <>
        <TableBase
            columns={columns}
            dataSource={Permission}
            loading={loading}
            onPageChange={handlePageChange}
            pagination={pagination}
        />
    </>
);
}

export default ListPermisson;
