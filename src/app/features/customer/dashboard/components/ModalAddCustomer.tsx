import { Form, Modal } from 'antd';
import { InputField, RadioGroupField } from 'app/utils/components/FormFields';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Customer } from '../../../../interfaces/customer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePickerField } from 'app/utils/components/FormFields/DatePickerField';

interface Props {
	isModalVisible: boolean;
	onOk: () => void;
	onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	dataField?: Customer;
}

const formValidate = yup.object().shape({
	fullname: yup.string().required(),
	username: yup.string().required(),
	phone: yup.string().required(),
	email: yup.string().required(),
	address: yup.string().required(),
	birthday: yup.date().required(),
	gender: yup.number().required(),
	customer_type_id: yup.number().required(),
});

const ModalAddCustomer = ({ isModalVisible, onOk, onCancel, dataField }: Props) => {
	const { control, handleSubmit } = useForm({
		resolver: yupResolver(formValidate),
	});

	const handleFormSubmit = (formValues: Customer) => {
		console.log(`formValues`, formValues);
	};
	return (
		<Modal
			title="Thông tin khách hàng"
			visible={isModalVisible}
			onOk={handleSubmit(handleFormSubmit)}
			onCancel={onCancel}
			okText="Lưu"
		>
			<Form layout="vertical">
				<InputField control={control} name="username" label="Tên truy cập" required />
				<InputField control={control} name="fullname" label="Họ và tên" required />
				<DatePickerField control={control} name="birthday" label="Ngày sinh" required />
				<InputField control={control} name="phone" label="Số điện thoại" required />
				<InputField control={control} name="email" label="Email" type="email" required />
				<InputField control={control} name="address" label="Địa chỉ" required />
				<RadioGroupField
					required
					control={control}
					label="Giới tính"
					name="gender"
					options={[
						{
							label: 'Nam',
							value: 0,
						},
						{
							label: 'Nữ',
							value: 1,
						},
					]}
				/>
			</Form>
		</Modal>
	);
};

export default ModalAddCustomer;
