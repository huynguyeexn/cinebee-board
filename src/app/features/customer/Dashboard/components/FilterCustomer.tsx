import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const { Option } = Select;

interface searchType {
	title: string;
	key: string;
	[key: string]: any;
}

interface Props {
	searchType?: searchType[];
}

const FilterCustomer = ({ searchType }: Props) => {
	return (
		<Row>
			<Col span={8}>
				<Form
					// form={form}
					layout="vertical"
					// initialValues={{ requiredMarkValue: requiredMark }}
					// onValuesChange={onRequiredTypeChange}
					// requiredMark={requiredMark}
				>
					<Form.Item label="Tìm kiếm" name="search" style={{ marginBottom: 0 }}>
						<Input.Group compact>
							{searchType && (
								<Select defaultValue={searchType[0].key} style={{ width: '30%' }}>
									{searchType.slice(0, -1).map((type) => (
										<Option key={type.key} value={type.key}>
											{type.title}
										</Option>
									))}
								</Select>
							)}
							<Input
								style={{ width: '70%' }}
								placeholder="Từ khóa tìm kiếm..."
								suffix={<AiOutlineSearch />}
							/>
						</Input.Group>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default FilterCustomer;
