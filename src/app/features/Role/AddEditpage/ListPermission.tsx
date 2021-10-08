import React from 'react'
import { Permission } from 'app/interfaces';
import { Checkbox, Col } from 'antd';

interface Props {
    data: Permission[];
    name: string;
}

const ListPermission = ({data,name}: Props) => {
 
    return (
        <>
        
          {data.filter((prefix)=> prefix.prefix === name).map((val) => (
                <Col span={24} key={val.display_name}>
                    <Checkbox value={val.id} >{val.display_name}</Checkbox>
                </Col>
            ))}   
        </>
    )
}

export default ListPermission;
