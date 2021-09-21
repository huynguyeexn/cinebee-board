import { Col, Layout, Menu, Row } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';

const { Header } = Layout;

const { SubMenu } = Menu;
interface Props {
	collapsed: boolean;
	onCollapse: () => void;
}

const TopHeader = ({ collapsed, onCollapse }: Props) => {
	// const history = useHistory();

	// const onLogoutClick = () => {
	// 	localStorage.removeItem('access_token');
	// 	history.push('/login');
	// };

	return (
		<Header id="top-header" className="site-layout-background" style={{ padding: 0 }}>
			<Row>
				<Col span={12}>
					{collapsed ? (
						<RiMenuUnfoldLine className="trigger" onClick={onCollapse} />
					) : (
						<RiMenuFoldLine className="trigger" onClick={onCollapse} />
					)}
				</Col>
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
