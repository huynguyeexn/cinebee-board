import React from 'react'
import { Permission } from 'app/interfaces';
import { Checkbox, Col } from 'antd';

interface Props {
    data: Permission[];
    name: string;
    checkbox: boolean;
}

const ListPermission = ({data,name,checkbox}: Props) => {
    // const check =  checkbox === true ? "checked":"";

    return (
        <>
          {data.filter((prefix)=> prefix.prefix === name).map((val) => (
                <Col span={24} key={val.display_name}>
                    <Checkbox value={val.id} checked={checkbox}>{val.display_name}</Checkbox>
                </Col>
            ))}   
        </>
    )
}

export default ListPermission;
