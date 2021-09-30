import { Form, Select } from 'antd';
import React from 'react';
import { Control, useController } from 'react-hook-form';

const { Option } = Select;

interface OptionsProps {
	label?: string;
	value: number | string;
}

interface Props {
	label: string;
	name: string;
	control: Control<any>;
	options: OptionsProps[];
	required?: boolean;
}

export const SelectField = ({ label, name, control, options, required }: Props) => {
	const {
		field: { value, onChange, onBlur, ref },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
	});
	return (
		<Form.Item
			label={label}
			validateStatus={invalid ? 'error' : ''}
			help={error?.message}
			required={required}
			name={name}
		>
			<Select
				allowClear
				showSearch
				placeholder={`${label}...`}
				optionFilterProp="children"
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				value={value}
				filterOption={(input, option: any) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{options.map((option, idx) => (
					<Option key={`select-option-${option.value}-${idx}`} value={option.value}>
						{option.label}
					</Option>
				))}
			</Select>
		</Form.Item>
	);
};
