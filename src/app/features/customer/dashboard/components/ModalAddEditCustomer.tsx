import { Modal, Form, Input, Row, Col, DatePicker, Radio, Select } from 'antd';
import { Customer } from 'app/interfaces';
import React from 'react';

const { Option } = Select;

interface Props {
	isModalVisible: boolean;
	onOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	dataField?: Customer;
}

const ModalAddEditCustomer = ({ isModalVisible, onOk, onCancel, dataField }: Props) => {
	const [form] = Form.useForm();

	console.log('ModalAddEditCustomer', dataField);

	return (
		<Modal
			title="Thông tin khách hàng"
			visible={isModalVisible}
			onOk={onOk}
			onCancel={onCancel}
			okText="Lưu"
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={dataField}
				onValuesChange={(a, b) => console.log(a, b)}
			>
				<Form.Item label="Tên người dùng" required name="username">
					<Input placeholder="username..." />
				</Form.Item>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Họ và tên" required name="fullname">
							<Input placeholder="Nguyễn Văn A..." />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Ngày sinh">
							<DatePicker placeholder="Ngày sinh" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Số điện thoại" required name="phone">
							<Input placeholder="0999..." />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Email" name="email">
							<Input placeholder="email@gmail.com..." />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="Địa chỉ" name="address">
							<Input placeholder="Quận 12, HCM..." />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Giới tính" name="sex">
							<Radio.Group>
								<Radio.Button value={0}>Nam</Radio.Button>
								<Radio.Button value={1}>Nữ</Radio.Button>
								<Radio.Button value={2}>Khác</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Khách hàng" name="customer_type_id">
							<Select defaultValue="1">
								<Option value="1">Đồng</Option>
								<Option value="3">Vàng</Option>
								<Option value="2">Bạc</Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default ModalAddEditCustomer;
