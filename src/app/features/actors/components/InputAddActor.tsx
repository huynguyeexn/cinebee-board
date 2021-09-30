import { Avatar, Button, Col, Form, Popconfirm, Row, Select } from 'antd';
import { Actor } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import {
	actorActions,
	selectActorActionLoading,
	selectActorSearchList,
} from '../redux/actorSlice';

const { Option } = Select;

interface Props {
	name: string;
	control: Control;
}

const InputAddActor = ({ name, control }: Props) => {
	const dispatch = useAppDispatch();
	const selectSearchList = useAppSelector(selectActorSearchList);
	const actionLoading = useAppSelector(selectActorActionLoading);

	const [options, setOptions] = React.useState<any>([]);
	const [value, setValue] = React.useState<number>();
	const [actorSelected, setActorSelected] = React.useState<Actor[]>([]);

	const {
		field: { onChange },
	} = useController<any>({ name, control });

	React.useEffect(() => {
		const element =
			selectSearchList?.map((actor) => (
				<Option
					key={`search-actor-${actor.id}`}
					value={actor.id as number}
					style={{ display: 'flex', alignItems: 'center' }}
					label={actor.fullname}
				>
					<Avatar shape="square" src={actor.avatar} style={{ marginRight: '8px' }} />
					{actor.fullname}
				</Option>
			)) || [];
		setOptions(element);
	}, [selectSearchList]);

	const handleSearch = (name: string) => {
		if (name) {
			dispatch(actorActions.searchByName(name));
		}
	};

	const handleAddActor = () => {
		const selected: Actor = selectSearchList.filter((actor) => actor.id === value)[0];
		if (actorSelected.find((actor) => actor.id === selected.id)) return;
		const result = [...actorSelected, selected];
		const idList = result.map((actor) => actor.id);
		onChange(idList);
		setActorSelected(result);
	};

	const handleDelete = (actor: Actor) => {
		const result = actorSelected.filter((value) => value.id !== actor.id);
		setActorSelected(result);
	};

	const tableColumns = [
		{
			title: 'id',
			dataIndex: 'id',
		},
		{
			title: 'avatar',
			dataIndex: 'avatar',
			render: (avatar: string, record: Actor) => {
				return <Avatar size="large" shape="square" src={avatar} />;
			},
		},
		{
			title: 'Tên diễn viên',
			dataIndex: 'fullname',
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (text: string, record: Actor) =>
				actorSelected ? (
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
						<AiOutlineDelete />
					</Popconfirm>
				) : null,
		},
	];

	return (
		<Row gutter={[16, 16]}>
			<Col span={16}>
				<Form.Item label="Diễn viên">
					<Select
						optionLabelProp="label"
						allowClear
						loading={actionLoading}
						showSearch
						value={value}
						placeholder={'Nhập tên diễn viên để tìm...'}
						defaultActiveFirstOption={false}
						showArrow={false}
						filterOption={false}
						onSearch={handleSearch}
						onChange={(value) => {
							console.log('onChange', value);
							setValue(value);
						}}
						notFoundContent={null}
					>
						{options}
					</Select>
				</Form.Item>
			</Col>
			<Col span={6}>
				<Form.Item label="&nbsp;">
					<Button onClick={handleAddActor}>Thêm diẽn viên</Button>
				</Form.Item>
			</Col>
			<Col span={24}>
				<TableBase columns={tableColumns} dataSource={actorSelected} loading={false} />
			</Col>
		</Row>
	);
};

export default InputAddActor;
