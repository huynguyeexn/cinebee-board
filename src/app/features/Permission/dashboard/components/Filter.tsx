import React, {ChangeEvent} from 'react'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { selectPermissonFilter,
    PermissionActions
 } from './../../redux/PermissionSlide';
import { Row, Col, Form, Input, Select } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';


const { Option } = Select;

interface searchType {
    title: string;
    key: string;
}

const FilterPermission = () => {
    const searchType: searchType[] = [
        {
            title: 'Tên quyền',
            key: 'name',
        },
        {
            title: 'ID',
            key: 'id',
        }
   ];
   const dispatch = useAppDispatch();
   const filter = useAppSelector(selectPermissonFilter);
   const [searchBy, setsearchBy] = React.useState<string>(searchType[0].key);
   React.useEffect(()=>{
     if(filter.q){
         const newFilter = {
             q: filter.q,
             search: searchBy
         }
     }
   });
   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const newFilter = {
        ...filter,
        q: value,
        search: searchBy,
    };

      dispatch(PermissionActions.setFilterDebounce(newFilter));
    };
    return (
        <Row gutter={16} style={{ width: '100%' }}>
        <Col sm={24} md={12}>
            <Form layout="vertical">
                <Form.Item label="Tìm kiếm" name="search" style={{ marginBottom: 0 }}>
                    <Input.Group compact>
                        <Select onChange={setsearchBy} value={searchBy} style={{ width: '120px' }}>
                            {searchType.map((type) => (
                                <Option key={type.key} value={type.key}>
                                    {type.title}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            style={{ width: 'auto' }}
                            placeholder="Từ khóa tìm kiếm..."
                            suffix={<AiOutlineSearch />}
                            onChange={handleSearchChange}
                        />
                    </Input.Group>
                </Form.Item>
            </Form>
        </Col>
    </Row>
    )
}

export default FilterPermission;
