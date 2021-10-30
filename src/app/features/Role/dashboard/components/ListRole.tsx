import React from 'react';
import { Space, Button, Popconfirm, Modal, Form, Typography, Checkbox, Row, Col, Input } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { blue } from '@ant-design/colors';
import moment from 'moment';
import TableBase from 'app/utils/components/TableBase';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/redux/hooks';
import { selectRoleList, selectRoleLoading, selectRolePagination, selectRoleFilter, selectPemissionRolelist, selectPermsission } from './../../redux/RoleSlide';
import {RoleActions} from '../../redux/RoleSlide';
import { Role } from 'app/interfaces';
import ListPermission_Role from './ListPermission_Role';
import roleApi from 'app/api/RoleApi';

const { Title } = Typography;
interface Props {
    
}

const ListRole = (props: Props) => {
	const dispatch = useDispatch();
	const role = useAppSelector(selectRoleList);
	const loading = useAppSelector(selectRoleLoading);
	const pagination = useAppSelector(selectRolePagination);
  const filter = useAppSelector(selectRoleFilter);
  const Permission_Role = useAppSelector(selectPemissionRolelist);
  const Permission = useAppSelector(selectPermsission);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [role_id,setRole_id] = React.useState();
  const [Add,SetAdd] = React.useState(false);
  const [title,setTitle] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  const [form] = Form.useForm();
 
    React.useEffect(() => {
      form.setFieldsValue({
        role: "",
        permission: [],
      });
    });
    React.useEffect(()=>{
         if(edit){
          (async () => {
            let response: any = await roleApi.getById(role_id);
            const id_pe = [] as any;
            for(var permission of response.premission){
              id_pe.push(permission.id);
            }
            form.setFieldsValue({role:response.id, permission: id_pe});
          })();
         }
    });
    const addPer_Role = (role: any) =>{
        setVisible(true);
        SetAdd(true);
        setTitle("Thêm quyền cho "+role.name);
        setTimeout(() => {
          form.setFieldsValue({role:role.id});
        }, 500);
    }
    const showListPe = (role: any) => {
      setVisible(true);
      setRole_id(role.id);
      setTitle("Danh sách quyền của "+role.name);
    };
    
    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
        SetAdd(false);
        setEdit(false);
      }, 2000);
    };
    const handleCancel = () => {
      setVisible(false);
      SetAdd(false);
      setEdit(false);
    };
    const onsubmit = ((values: any)=>{    
      if(edit){
         dispatch(RoleActions.update(values));
      }else{
         dispatch(RoleActions.create(values));
      }
      setVisible(false);
      setConfirmLoading(false);
      SetAdd(false);
      setEdit(false);
    });
    const onCheck = (e: any) =>{
      const peid = [] as any;
      if(e.target.checked){
        for(var pe of Permission){
          peid.push(pe.id);
        }
        form.setFieldsValue({permission:peid});
      }else{
        form.setFieldsValue({permission:peid});
      }
      
    }
    // permission_role
    React.useEffect(()=>{
        dispatch(RoleActions.getListRolePermission());
    },[dispatch]);

    React.useEffect(()=>{
          dispatch(RoleActions.getListPermissionALL());
      },[dispatch]);
    // role
    React.useEffect(()=>{
          dispatch(RoleActions.getList(filter));
    },[dispatch,filter]);
 
    const handlepageChange = (page: number, pageSize?: number)=>{
		const newFilter = {
			...filter,
			page: page,
			per_page: pageSize,
		};
		dispatch(RoleActions.setFilter(newFilter));
	}
    // xóa
	const handleDelete = (role: Role)=>{
      dispatch(RoleActions.deleteById(role));
	}
   const OnEdit = (role: any)=>{
      setRole_id(role.id);
      setEdit(true);
      SetAdd(true);
      setVisible(true);
      setTitle("Sửa quyền của "+role.name);
   }

    const columns = [
        {
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			width: 65,
		},
		{
			title: 'Chức vụ',
			dataIndex: 'name',
			key: 'name',
			width: 200,
		},
		{
			title: 'Quyền',
			// dataIndex: 'action',
			key: 'action',
			width: 500,
			render: (render: Role) => (
               // eslint-disable-next-line react/jsx-pascal-case
               <ListPermission_Role role={render} permission={Permission} permission_role={Permission_Role} />
			),

		},
        {
			title: 'Cập nhật',
			key: 'updated_at',
			dataIndex: 'updated_at',
			width: 200,
			render: (text: string) => <span>{moment(text).fromNow()}</span>,
		},
		{
			title: 'Thao tác',
			key: 'action',
			fixed: 'right',
			width: 65,
			render: (render: Role) => (
				<Space size="middle">
            {Permission_Role.filter(val=> val.role_id === render.id).length > 10 ? <Button
						type="default"
						style={{ color: blue[3], borderColor: blue[3] }}
						onClick={() => showListPe(render)} >
					  Xem chi tiết
				    </Button>:""}
            {Permission_Role.filter(val=> val.role_id === render.id).length === 0 ?   <Button
						type="default"
						style={{ color: blue[3], borderColor: blue[3] }}
						onClick={() => addPer_Role(render)} 
                    >
					  Thêm
				  </Button>:<Button
					type="default"
					style={{ color: blue[3], borderColor: blue[3] }}
					onClick={() => OnEdit(render)}
				>
					<AiOutlineEdit />
				</Button>}
				
				  
				<Popconfirm title="Bạn chắc chứ?" onConfirm={() => handleDelete(render)}>
					<Button type="default" danger>
						<AiOutlineDelete />
					</Button>
				</Popconfirm>
			</Space>

			),
		},
    ]

    return (
        <>
        <TableBase
        columns={columns}
        dataSource={role}
        loading={loading}
        onPageChange={handlepageChange}
        pagination={pagination}
        />
		 <Modal
                title={title}
                visible={visible}
                onOk={Add !== true ? handleOk:form.submit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                // okButtonProps={{ style:{display:'none'}}}
                width="80%"
                footer={Add !== true 
                ? [<Button key="back" onClick={handleCancel} loading={confirmLoading}>Thoát</Button>]
                : [<Button key="back" onClick={handleCancel} loading={confirmLoading}>
                     Thoát
                  </Button>,
                  <Button key="submit" loading={confirmLoading} onClick={Add !== true ? handleOk:form.submit} type="primary">
                      {edit === true ? "Sửa":"Thêm"}
                  </Button>
                ]}
                >
                {Add === true ? 
                <Form 
                  layout="vertical" 
                  form={form}
                  onFinish={onsubmit}
                  
                >
                  <Title level={3}>Chọn tất cả</Title>
					<Checkbox onChange={onCheck} style={{ marginBottom: "20px" }}>Chọn tất cả</Checkbox>
                  <Form.Item name="role" rules={[{ required: true, message: 'Không được bỏ trống' }]} hidden><Input /></Form.Item>
                  <Form.Item name="permission" rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                    <Checkbox.Group >
                      <Row>
                        {Permission.map((val,i)=>(
                          <Col key={val.id} sm={4} xs={24}>
                            <Checkbox value={val.id} >{val.display_name}</Checkbox>
                          </Col>
                        ))}
                      </Row>
					</Checkbox.Group>
                  </Form.Item>
                </Form>
                :
                <Row>
                   {Permission_Role.filter(val=> val.role_id === role_id).map((pe_role,i)=>{
                    return (
                        <>
                        {Permission.filter(id_pe => id_pe.id === pe_role.permission_id).map((val,i)=>
                        (<Col sm={4} xs={24} key={val.id}>{val.display_name}</Col>))}
                        </>
                    )
                   })}
                 </Row>
                }
            </Modal>
        </>
    )
}

export default ListRole;
