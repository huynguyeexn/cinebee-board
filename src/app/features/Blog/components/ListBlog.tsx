import React from 'react'
import TableBase from './../../../utils/components/TableBase/index';
import { Space, Spin, Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { SelectBlogList, 
    selectBlogListLoading, SelectBlogFilter, 
    SelectBlogPagination,BlogAction } from './../redux/BlogSlide';
import { useAppSelector } from 'app/redux/hooks';
import { categoryActions, selectCategoryMap } from 'app/features/category/redux/categorySlice';
import { selectEmployeeMap, employeeActions } from 'app/features/Employee/redux/employeeSlice';
import { Link } from 'react-router-dom';
import { Blog } from 'app/interfaces';
import { AiOutlineEdit, AiOutlineDelete, AiFillEye } from 'react-icons/ai';
import { blue } from '@ant-design/colors';





interface Props {
   
}

const ListBlog = (props: Props) => {
   const dispatch = useDispatch();
   const Blog = useAppSelector(SelectBlogList);
   const loading = useAppSelector(selectBlogListLoading);
   const filter = useAppSelector(SelectBlogFilter);
   const pagination = useAppSelector(SelectBlogPagination);
   const CategoriMap = useAppSelector(selectCategoryMap);
   const EmployeeMap = useAppSelector(selectEmployeeMap);
   
   React.useEffect(()=>{
     dispatch(BlogAction.ListBlog(filter));
   },[dispatch,filter]);
   // Thể loại
    React.useEffect(() => {
        dispatch(categoryActions.getAll());
    }, [dispatch]);
    // Người đăng
    React.useEffect(() => {
        dispatch(employeeActions.getAll());
    }, [dispatch]);
   // phân trang
   const handlePageChange = (page: number, pageSize?: number) => {
        const newFilter = {
            ...filter,
            page: page,
            per_page: pageSize
        }
        dispatch(BlogAction.ListBlog(newFilter));
    }
    const handleDelete = (blog: Blog) =>{
        dispatch(BlogAction.delete(blog));
    }
    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key:'id',
            width: 65,
        },
        {
            title:'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Người đăng',
            key: 'employee_id',
			dataIndex: 'employee_id',
			width: 150,
            render: (id: number) => (
				<>
					<span>
						{Object.keys(EmployeeMap).length !== 0 ? 
							EmployeeMap[`${id}`]?.fullname
						: (
							<Spin size="small" />
						)}
					</span>
				</>
			),
        },
        {
            title: 'Thể loại',
            dataIndex: 'category_id',
            key: 'category_id',
            render: (id: number) => (
				<>
					<span>
						{Object.keys(CategoriMap).length !== 0 ? (
							CategoriMap[`${id}`]?.name
						) : (
							<Spin size="small" />
						)}
					</span>
				</>
			),
        },
        {
            title: 'Số lượt xem',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'show',
            key: 'show',
            render: (id: number) => (
                id === 1 ? "Đang hiện":"Đang ẩn"
            )
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'date',
            Key: 'date',
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (text: Blog) => (
              <Space size="middle">
                <Link to={`blog/${text.id}/view`}>
                    <Button >
                            Xem chi tiết <AiFillEye />
                    </Button>
                </Link>
                <Link to={`blog/${text.id}/edit`}>
                    <Button style={{ color: blue[3] }}>
							Sửa <AiOutlineEdit />
					</Button>
                </Link>
                <Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(text)}>
                    <Button danger>
                        Xóa <AiOutlineDelete />
                    </Button>
				</Popconfirm>
              </Space>
            ),
          },
    ]
    return (
        <TableBase
            columns= {columns}
            dataSource = {Blog}
            pagination = {pagination}
            onPageChange = {handlePageChange}
            loading = {loading}
        />
    )
}

export default ListBlog
