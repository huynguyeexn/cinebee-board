import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal, Spin } from 'antd';
import { selectCustomerTypeOptions } from 'app/features/customerType/redux/customerTypeSlice';
import { useAppSelector } from 'app/redux/hooks';
import {
	InputField,
	RadioGroupField,
	SelectField,
} from 'app/utils/components/FormFields';
import { DatePickerField } from 'app/utils/components/FormFields/DatePickerField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Customer } from '../../../../interfaces/customer';

interface Props {
	isModalVisible: boolean;
	onOk: () => void;
	onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	customer?: Customer;
}

const formValidate = yup.object().shape({
	fullname: yup.string().required(),
	username: yup.string().required(),
	phone: yup.string().required(),
	email: yup.string().required(),
	address: yup.string().required(),
	birthday: yup.string().required(),
	gender: yup.number().required(),
	customer_type_id: yup.number().required(),
});

const ModalEditCustomer = ({ isModalVisible, onOk, onCancel, customer }: Props) => {
	const typeOptions = useAppSelector(selectCustomerTypeOptions);

	console.log(`typeOptions`, typeOptions);

	const { control, handleSubmit } = useForm<any>({
		defaultValues: customer,
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
			{customer ? (
				<Form layout="vertical" initialValues={customer}>
					<InputField control={control} name="username" label="Tên truy cập" required />
					<InputField control={control} name="fullname" label="Họ và tên" required />
					<DatePickerField control={control} name="birthday" label="Ngày sinh" required />
					<InputField control={control} name="phone" label="Số điện thoại" required />
					<InputField
						control={control}
						name="email"
						label="Email"
						type="email"
						required
					/>
					<InputField control={control} name="address" label="Địa chỉ" required />
					<RadioGroupField
						required
						control={control}
						label="Giới tính"
						name="gender"
						buttonType
						options={[
							{
								label: 'Nam',
								value: 0,
							},
							{
								label: 'Nữ',
								value: 1,
							},
							{
								label: 'Khác',
								value: 2,
							},
						]}
					/>
					<SelectField
						control={control}
						name="customer_type_id"
						label="Hạng"
						required
						options={typeOptions}
					/>
				</Form>
			) : (
				<Spin />
			)}
		</Modal>
	);
};

export default ModalEditCustomer;
