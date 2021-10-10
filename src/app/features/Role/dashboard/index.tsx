import React from 'react'
import { Row, Col, Button } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import ListRole from './components/ListRole';
import { Link } from 'react-router-dom';
interface Props {
    
}
const Role = (props: Props) => {
  
    return (
       <Row gutter={[16,16]}>
         <Col span={24}>
             <Link to="role/new">
              <Button
              icon={<AiOutlinePlus />}
              style={{ 
                  display:'flex',
                  alignItems: 'center'
               }}
              >
                Thêm quyền
              </Button>
              </Link>
         </Col>
         <Col span={24}></Col>
         <Col span={24}>
             <ListRole />
         </Col>
       </Row>
    )
}

export default Role;
