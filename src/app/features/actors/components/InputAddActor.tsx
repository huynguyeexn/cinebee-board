import { Avatar, Button, Card, Col, Form, Popconfirm, Row, Select, Spin } from 'antd';
import { Actor } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { actorActions, selectActorActionLoading, selectActorSearchList } from '../redux/actorSlice';

const { Option } = Select;

interface Props {
	name: string;
	control: Control;
	data?: Actor[];
}

const InputAddActor = ({ name, control, data }: Props) => {
	const dispatch = useAppDispatch();
	const selectSearchList = useAppSelector(selectActorSearchList);
	const actionLoading = useAppSelector(selectActorActionLoading);

	const [options, setOptions] = React.useState<any>([]);
	const [value, setValue] = React.useState<number>();
	const [actorSelected, setActorSelected] = React.useState<Actor[]>(data || []);

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
		if (!selectSearchList.length || !actorSelected) return;

		const selected: Actor = selectSearchList.filter(
			(actor: Actor) => (actor.id as number) === value
		)[0];

		if (actorSelected.find((actor) => actor.id === selected.id)) return;
		const result = [...actorSelected, selected];
		const idList = result.map((actor) => actor.id);
		onChange(idList);
		setActorSelected(result);
	};

	const handleDelete = (actor: Actor) => {
		const result = actorSelected?.filter((value) => value.id !== actor.id);
		console.log(`handleDelete`, actorSelected);
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
		<Card style={{ marginTop: 16 }} type="inner" title="Thêm diễn viên">
			<Row gutter={[16, 16]}>
				<Col span={16}>
					<Form.Item label="Diễn viên" name={name}>
						<Select
							optionLabelProp="label"
							allowClear
							showSearch
							value={value}
							placeholder={'Nhập tên diễn viên để tìm...'}
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
						<Button onClick={handleAddActor}>Thêm diễn viên</Button>
					</Form.Item>
				</Col>
				<Col span={24}>
					<TableBase columns={tableColumns} dataSource={actorSelected} loading={false} />
				</Col>
			</Row>
		</Card>
	);
};

export default InputAddActor;
