import { Form, Input, Select } from 'antd';
import React from 'react';
import { ReactNode } from 'react-router/node_modules/@types/react';
import { OptionsProps } from '.';

interface Props {
	label?: string;
	name: string;
	inputPlaceHolder?: string;
	inputIcon?: ReactNode;
	selectOptions: OptionsProps[];
	selectValue: string;
	onChangeSelect: (value: any) => void;
	onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
}

const InputGroupSearch = ({
	label,
	name,
	inputPlaceHolder,
	inputIcon,
	selectOptions,
	selectValue,
	onChangeSelect,
	onChangeInput,
}: Props) => {
	return (
		<Form.Item label={label} name={name} style={{ width: '100%' }}>
			<Input.Group compact style={{ display: 'flex' }}>
				<Select
					style={{ minWidth: '100px' }}
					onChange={onChangeSelect}
					value={selectValue}
				>
					{selectOptions.map((type, idx) => (
						<Select.Option
							key={`${name}-${type.key}` || `${name}-${idx}`}
							value={type.value}
						>
							{type.label}
						</Select.Option>
					))}
				</Select>
				<Input
					placeholder={inputPlaceHolder}
					suffix={inputIcon}
					onChange={onChangeInput}
					allowClear
				/>
			</Input.Group>
		</Form.Item>
	);
};

export default InputGroupSearch;
