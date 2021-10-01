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
			initialValue={
				Array.isArray(value) ? value?.map((val: number) => val.toString()) : value
			}
			validateStatus={invalid ? 'error' : ''}
		>
			<Select
				ref={ref}
				allowClear
				showSearch
				mode={mode}
				onBlur={onBlur}
				onChange={onChange}
				placeholder={`${label}...`}
				filterOption={(input, option: any) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{options.map((option) => (
					<Option key={`${name}-${option.value}`} value={`${option.value}`}>
						{option.label}
					</Option>
				))}
			</Select>
		</Form.Item>
	);
};
