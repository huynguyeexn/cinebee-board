import { Permission, permission_role, Role } from 'app/interfaces'

import { Col, Row} from 'antd';


interface props{
    role:  Role;
    permission: Permission[];
    permission_role: permission_role[];
}


const ListPermission_Role = ({role,permission,permission_role}:props) => {
   
    return (
        <Row>
            {permission_role.filter(val => val.role_id === role.id).map((pe_role,i)=>{
                 return (
                     <>
                     {permission.slice(0,10).filter(id_pe => id_pe.id === pe_role.permission_id).map((val,i)=>
                     (<Col span={8} key={val.id}>{val.display_name}</Col>))}
                    
                     </>
                 )
            })}
             {/* {permission_role.filter(val => val.role_id === role.id).length > 10
             ?<Col span={24} style={{ marginTop: "10px" }}><Button type="primary" onClick={()=>showListPe(role)}>Xem thêm</Button></Col>
             :(permission_role.filter(val => val.role_id === role.id).length === 0)
             ?<Col span={24}><Button type="primary" onClick={()=>addPer_Role(role)}>Thêm quyền</Button></Col>:""} */}
             
        </Row>
       
    )
}

export default ListPermission_Role
