import { Form, Radio } from 'antd';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface RadioProps {
	label: string;
	value: string | number;
	disabled?: boolean;
}

interface Props {
	label: string;
	name: string;
	control: Control<any>;
	options: RadioProps[];
	buttonType?: boolean;
	required?: boolean;
}

export const RadioGroupField = ({
	label,
	name,
	control,
	options,
	buttonType = false,
	required,
}: Props) => {
	const {
		field: { onChange, ref },
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
			<Radio.Group onChange={onChange} ref={ref}>
				{options.map((opt, idx) =>
					buttonType ? (
						<Radio.Button
							key={`radio-button-${opt.value}-${idx}`}
							value={opt.value}
							disabled={opt?.disabled}
						>
							{opt.label}
						</Radio.Button>
					) : (
						<Radio
							key={`radio-${opt.value}-${idx}`}
							value={opt.value}
							disabled={opt?.disabled}
						>
							{opt.label}
						</Radio>
					)
				)}
			</Radio.Group>
		</Form.Item>
	);
};
