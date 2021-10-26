import { Avatar, Button, Card, Col, Form, Popconfirm, Row, Select, Spin } from 'antd';
import { Director } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import {
	directorActions,
	selectDirectorActionLoading,
	selectDirectorSearchList,
} from '../redux/directorSlice';

const { Option } = Select;

interface Props {
	name: string;
	control: Control;
	data?: Director[];
}

const InputAddDirector = ({ name, control, data }: Props) => {
	const dispatch = useAppDispatch();
	const selectSearchList = useAppSelector(selectDirectorSearchList);
	const actionLoading = useAppSelector(selectDirectorActionLoading);

	const [options, setOptions] = React.useState<any>([]);
	const [value, setValue] = React.useState<number>();
	const [directorSelected, setDirectorSelected] = React.useState<Director[]>(data || []);

	const {
		field: { onChange },
	} = useController<any>({ name, control });

	React.useEffect(() => {
		const element =
			selectSearchList?.map((director) => (
				<Option
					key={`search-director-${director.id}`}
					value={director.id as number}
					style={{ display: 'flex', alignItems: 'center' }}
					label={director.fullname}
				>
					<Avatar shape="square" src={director.avatar} style={{ marginRight: '8px' }} />
					{director.fullname}
				</Option>
			)) || [];
		setOptions(element);
	}, [selectSearchList]);

	const handleSearch = (name: string) => {
		if (name) {
			dispatch(directorActions.searchByName(name));
		}
	};

	const handleAddDirector = () => {
		if (!selectSearchList.length || !directorSelected) return;

		const selected: Director = selectSearchList.filter(
			(director: Director) => (director.id as number) === value
		)[0];

		if (directorSelected.find((director) => director.id === selected.id)) return;
		const result = [...directorSelected, selected];
		const idList = result.map((director) => director.id);
		onChange(idList);
		setDirectorSelected(result);
	};

	const handleDelete = (director: Director) => {
		const result = directorSelected?.filter((value) => value.id !== director.id);
		console.log(`handleDelete`, directorSelected);
		setDirectorSelected(result);
	};

	const tableColumns = [
		{
			title: 'id',
			dataIndex: 'id',
		},
		{
			title: 'avatar',
			dataIndex: 'avatar',
			render: (avatar: string, record: Director) => {
				return <Avatar size="large" shape="square" src={avatar} />;
			},
		},
		{
			title: 'Tên đao diễn',
			dataIndex: 'fullname',
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (text: string, record: Director) =>
				directorSelected ? (
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
						<AiOutlineDelete />
					</Popconfirm>
				) : null,
		},
	];

	return (
		<Card style={{ marginTop: 16 }} type="inner" title="Thêm đạo diễn">
			<Row gutter={[16, 16]}>
				<Col span={16}>
					<Form.Item label="Đạo diễn" name={name}>
						<Select
							optionLabelProp="label"
							allowClear
							showSearch
							value={value}
							placeholder={'Nhập tên đạo diễn để tìm...'}
							defaultActiveFirstOption={false}
							notFoundContent={actionLoading ? <Spin size="small" /> : null}
							showArrow={false}
							filterOption={false}
							onSearch={handleSearch}
							onChange={(value) => {
								setValue(value);
							}}
						>
							{options}
						</Select>
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item label="&nbsp;">
						<Button onClick={handleAddDirector}>Thêm đạo diễn</Button>
					</Form.Item>
				</Col>
				<Col span={24}>
					<TableBase columns={tableColumns} dataSource={directorSelected} loading={false} />
				</Col>
			</Row>
		</Card>
	);
};

export default InputAddDirector;
