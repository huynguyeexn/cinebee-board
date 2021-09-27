import { Table, Tag, Space } from 'antd';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text: string) => <a href="google.com">{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (tags: Array<string>) => (
			<>
				{tags.map((tag: string) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (text: string, record: any) => (
			<Space size="middle">
				<a href="google.com">Invite {record.name}</a>
				<a href="google.com">Delete</a>
			</Space>
		),
	},
];

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];

const DemoTable = () => {
	return <Table columns={columns} dataSource={data} />;
};

export default DemoTable;
