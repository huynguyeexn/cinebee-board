import React from 'react'
import { Row, Col} from 'antd';
import ListRole from './components/ListRole';
interface Props {
    
}
const Role = (props: Props) => {
  
    return (
       <Row gutter={[16,16]}>
         <Col span={24}></Col>
         <Col span={24}>
             <ListRole />
         </Col>
       </Row>
    )
}

export default Role;
