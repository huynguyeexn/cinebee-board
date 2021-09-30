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
	mode?: 'multiple' | 'tags';
	options: OptionsProps[];
	required?: boolean;
}

export const SelectField = ({ label, name, control, options, mode, required }: Props) => {
	const {
		field: { value, onChange, onBlur, ref },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
	});
	return (
		<Form.Item
			name={name}
			label={label}
			required={required}
			help={error?.message}
			validateStatus={invalid ? 'error' : ''}
		>
			<Select
				defaultActiveFirstOption={false}
				ref={ref}
				allowClear
				showSearch
				mode={mode}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
				optionFilterProp="children"
				placeholder={`${label}...`}
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
