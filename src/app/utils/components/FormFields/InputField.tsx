import React from 'react';
import { Form, Input, InputProps } from 'antd';
import { Control, useController } from 'react-hook-form';
import { InputHTMLAttributes } from 'react-router/node_modules/@types/react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	control: Control<any>;
	label?: string;
	required?: boolean;
}

export const InputField = ({ name, control, label, required, ...inputProps }: Props) => {
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
			name={name}
			validateStatus={invalid ? 'error' : ''}
			help={error?.message}
			required={required}
		>
			<Input
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				placeholder={`${label}...`}
				{...(inputProps as InputProps)}
			/>
		</Form.Item>
	);
};
