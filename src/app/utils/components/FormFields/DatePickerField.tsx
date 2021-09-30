import { Form } from 'antd';
import { DATE_FORMAT } from 'app/constants';
import 'moment/locale/vi';
import React from 'react';
import { Control, useController } from 'react-hook-form';
// import { DatePicker } from 'rsuite';
import { DatePicker } from 'antd';
import moment from 'moment';

interface Props {
	name: string;
	control: Control<any>;
	label?: string;
	required?: boolean;
}

export const DatePickerField = ({ name, control, label, required }: Props) => {
	const {
		field: { value, onChange },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
		defaultValue: '',
	});

	return (
		<Form.Item
			label={label}
			validateStatus={invalid ? 'error' : ''}
			help={error?.message}
			required={required}
		>
			<DatePicker
				name={name}
				value={!value ? undefined : moment(value).isValid() ? moment(value) : value}
				defaultValue={moment()}
				format={DATE_FORMAT}
				onChange={onChange}
				style={{ width: '100%' }}
			/>
		</Form.Item>
	);
};
