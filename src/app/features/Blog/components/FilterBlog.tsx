import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import React from 'react'
import { Col, Input, Form, Row, Select } from 'antd';
import { ChangeEvent } from 'react-router/node_modules/@types/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BlogAction, SelectBlogFilter } from '../redux/BlogSlide';

const { Option } = Select;
 
interface searchType {
    title: string;
    key: string;
}

export const FilterBLog = () => {

    const searchType: searchType[] = [
		{
			title: 'Tiêu đề',
			key: 'title',
		},
		{
			title: 'ID',
			key: 'id',
		},
		{
			title: 'Ẩn Hiện',
			key: 'show',
		},
	];

    const dispatch = useAppDispatch();
    const filter = useAppSelector(SelectBlogFilter); 

    const [searchBy, setSearchBy] = React.useState<string>(searchType[0].key);

    React.useEffect(() => {
        if(filter.q){
            const newFilter = {
                ...filter,
                q: filter.q,
                search: searchBy
            };

            dispatch(BlogAction.setFilterDebounce(newFilter))
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBy])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newFilter = {
            ...filter,
            q: value,
            search: searchBy, 
        };
        dispatch(BlogAction.setFilterDebounce(newFilter));
    }
    return (
        <Row gutter={16} style={{ width: '100%' }}>
			<Col sm={24} md={12}>
				<Form layout="vertical">
					<Form.Item label="Tìm kiếm" name="search" style={{ marginBottom: 0 }}>
						<Input.Group compact>
							<Select onChange={setSearchBy} value={searchBy} style={{ width: '120px' }}>
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