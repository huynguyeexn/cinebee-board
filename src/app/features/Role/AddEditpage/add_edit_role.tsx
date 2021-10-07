import React,{useState} from 'react'
import { PageHeader, Button, Spin, Row, Col, Form, Input, Typography, Checkbox } from 'antd';

import { RoleActions, selectPemissionlist, selectRoleLoading  } from '../redux/RoleSlide';
import { useAppSelector } from 'app/redux/hooks';
import { useAppDispatch } from 'app/redux/hooks';

import ListPermission from './ListPermission';
const { Title } = Typography;

interface Props {
    
}

const Add_edit_role = (props: Props) => {
   
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectRoleLoading);
	const permission = useAppSelector(selectPemissionlist);
	const [check,setCheck] = useState({checkAll:false});
    const prefix = ['actors','genres','seat-status',
	           'room-status','items','rooms','seats','role',
	           'directors','employee','age-ratings','movies',
	           'movie-directors','movie-genres','movie-actors',
	           'customer-types','customers'];
    React.useEffect(()=>{
       dispatch(RoleActions.getListPermission({}));
	},[dispatch]);
    
    const onSubmit = (data: []) => {
		dispatch(RoleActions.create(data));
	}
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	const onCheck = (e: any) =>{
		console.log(e.target.checked);
		if(e.target.checked){
            setCheck({checkAll: true});
		}else{
			setCheck({checkAll: false});
		}
	}
    return (
       <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={'Thêm mới quyền'}
        >
         <Spin spinning={loading}>
				{!loading && (
					<Row gutter={[16, 16]}>
						{/* List table */}
						<Col span={24}>
							<Form layout="vertical" onFinish={onSubmit} onFinishFailed={onFinishFailed} >	
							      <Form.Item
									label="Tên quyền"
									name="name"
									rules={[{ required: true, message: 'Không được bỏ trống' }]}
								   >
									<Input placeholder="Tên quyền" />
								</Form.Item>
								<Title>Chọn tất cả</Title>
								<Checkbox onChange={onCheck}>Chọn tất cả</Checkbox>
								<Form.Item name="permission" rules={[{ required: true, message: 'Hãy chọn 1 quyền' }]}>
                                   {/* <Checkbox.Group> */}
								     <Row>
								   {prefix.map((pre,key)=>{
									   return(
									       <Col span={6} key={key}>
										       <Title level={2}>{pre}</Title>
											   <ListPermission data={permission} name={pre} checkbox={check.checkAll}  />
										   </Col>
									   )
                                     })}
									 </Row>	
									{/* </Checkbox.Group> */}
                                </Form.Item>
									
								<Col span={24} style={{ textAlign: 'right' }}>
									<Button style={{ margin: '0 8px' }}  type="link">
										Clear
									</Button>
									<Button
										onClick={() => {
											// reset();
										}}
									>
										Hủy
									</Button>
									<Button
										loading={loading}
										style={{ margin: '0 8px' }}
										htmlType="submit"
										type="primary"
									>
										Lưu
									</Button>
								</Col>
							</Form>
						</Col>
					</Row>
				)} 
			</Spin>
     </PageHeader>
    )
}

export default Add_edit_role;
