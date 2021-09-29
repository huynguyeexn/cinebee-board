import { Col, Form, Row, Slider, InputNumber } from 'antd';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
	name: string;
	control: Control<any>;
	min?: number;
	max?: number;
	label?: string;
	required?: boolean;
}

export const SliderField = ({
	name,
	control,
	label,
	required,
	min = 0,
	max = 500,
}: Props) => {
	const {
		field: { value, onChange },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
		defaultValue: 0,
	});

	return (
		<Form.Item
			label={label}
			validateStatus={invalid ? 'error' : ''}
			help={error?.message}
			required={required}
			name={name}
		>
			<Row>
				<Col span={18}>
					<Slider
						min={min}
						max={max}
						onChange={onChange}
						value={typeof value === 'number' ? value : 0}
					/>
				</Col>
				<Col span={5}>
					<InputNumber
						min={min}
						max={max}
						style={{ margin: '0 8px', width: '100%' }}
						value={typeof value === 'number' ? value : 0}
						onChange={onChange}
					/>
				</Col>
			</Row>
		</Form.Item>
	);
};
