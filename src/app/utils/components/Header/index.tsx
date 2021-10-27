import { Col, Layout, Menu, Row } from 'antd';
import { logout } from 'app/utils/Account';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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
							<Menu.Item key="setting:1">
								<Link to="/admin/about">Thông tin tài khoản</Link>
							</Menu.Item>
							<Menu.Item onClick={() => logout()}>Đăng xuất</Menu.Item>
						</SubMenu>
					</Menu>
				</Col>
			</Row>
		</Header>
	);
};

export default TopHeader;
