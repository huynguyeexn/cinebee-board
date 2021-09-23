import { Form } from 'antd';
import { DATE_FORMAT } from 'app/constants';
import 'moment/locale/vi';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { DatePicker } from 'rsuite';

interface Props {
	name: string;
	control: Control<any>;
	label?: string;
	required?: boolean;
}

export const DatePickerField = ({ name, control, label, required }: Props) => {
	const {
		field: { onChange, onBlur, ref },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
	});

	return (
		<Form.Item
			label={label}
			name={name}
			validateStatus={invalid ? 'error' : ''}
			help={error?.message}
			required={required}
		>
			<DatePicker
				oneTap
				format={DATE_FORMAT}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				name={name}
			/>
		</Form.Item>
	);
};
