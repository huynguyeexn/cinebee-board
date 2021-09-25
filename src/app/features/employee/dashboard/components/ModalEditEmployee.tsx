import { Employee } from 'app/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Modal, Spin } from 'antd';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { selectEmployeeRoleOptions } from 'app/features/employeeRole/Redux/employeeRoleSlice';
import { useForm } from 'react-hook-form';
import {
	InputField,
	RadioGroupField,
	SelectField,
} from 'app/utils/components/FormFields';
import { DatePickerField } from 'app/utils/components/FormFields/DatePickerField';
import React from 'react';
import { employeeActions, selectEmployeeActionLoading } from '../../redux/employeeSlice';

interface Props {
	isModalVisible: boolean;
	onCancel: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	employee?: Employee;
}

const formValidate = yup.object().shape({
	fullname: yup.string().required(),
	username: yup.string().required(),
	phone: yup
		.string()
		.matches(/^0[0-9]{9,10}/)
		.nullable(),
	email: yup.string().nullable(),
	address: yup.string().nullable(),
	birthday: yup.string().nullable(),
	sex: yup.number().nullable(),
	employee_role_id: yup.number().nullable(),
});

const ModalEditEmployee = ({ isModalVisible, onCancel, employee }: Props) => {
	console.log(`data`, employee);
	const dispatch = useAppDispatch();
	const typeOptions = useAppSelector(selectEmployeeRoleOptions);
	const loading = useAppSelector(selectEmployeeActionLoading);

	const { control, handleSubmit } = useForm<any>({
		defaultValues: employee,
		resolver: yupResolver(formValidate),
	});

	const handleFormSubmit = (data: Employee) => {
		dispatch(employeeActions.update(data));

		onCancel();
	};

	return (
		<Modal
			title="Thông tin nhân viên"
			visible={isModalVisible}
			onOk={handleSubmit(handleFormSubmit)}
			onCancel={onCancel}
			confirmLoading={loading}
			okText="Lưu"
		>
			{employee ? (
				<Form layout="vertical" initialValues={employee}>
					<InputField control={control} name="username" label="Tên truy cập" required />
					<InputField control={control} name="fullname" label="Họ và tên" required />
					<DatePickerField control={control} name="birthday" label="Ngày sinh" />
					<InputField control={control} name="phone" label="Số điện thoại" />
					<InputField control={control} name="email" label="Email" type="email" />
					<InputField control={control} name="address" label="Địa chỉ" />
					<RadioGroupField
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
						name="employee_role_id"
						label="Chức vụ"
						options={typeOptions}
					/>
				</Form>
			) : (
				<Spin />
			)}
		</Modal>
	);
};

export default ModalEditEmployee;
