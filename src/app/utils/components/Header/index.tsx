import { Col, Layout, Menu, Row } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';

const { Header } = Layout;

const { SubMenu } = Menu;
interface Props {}

const TopHeader = (props: Props) => {
	return (
		<Header id="top-header" className="site-layout-background" style={{ padding: 0 }}>
			<Row>
				<Col span={12}></Col>
				<Col span={12}>
					<Menu mode="horizontal" className="user-menu">
						<SubMenu key="SubMenu" icon={<AiOutlineUser />} title="Huy Nguyễn">
							<Menu.Item key="setting:1">Option 1</Menu.Item>
							<Menu.Item key="setting:2">Option 2</Menu.Item>
							<Menu.Item key="setting:3">Option 3</Menu.Item>
							<Menu.Item key="setting:4">Option 4</Menu.Item>
						</SubMenu>
					</Menu>
				</Col>
			</Row>
		</Header>
	);
};

export default TopHeader;
