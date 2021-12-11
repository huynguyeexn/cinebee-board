import { Checkbox, Col, Collapse, Form, Row, Spin } from 'antd';
import { permissionsConfig } from 'app/constants';
import { useAppSelector } from 'app/redux/hooks';
import React from 'react';
import { selectPermissionsLoading, selectPermissionsOptions } from '../../redux/employeeRoleSlice';
interface Props {
		name: string;
}

const PermissionsTable = ({ name }: Props) => {
	const loading = useAppSelector(selectPermissionsLoading);
	const options = useAppSelector(selectPermissionsOptions);

	return (
		<Spin spinning={!options && loading}>
			<Form.Item name={name}>
				<Checkbox.Group style={{width: "100%"}}>
					<Collapse>
						{Object.keys(permissionsConfig).map(
							(key: string, index: number) =>
								permissionsConfig[key]?.name && (
									<Collapse.Panel header={permissionsConfig[key].name} key={index}>
										<Row>
											{options[key]?.map((value: any) => (
												<Col span={12} key={value.value}>
													<Checkbox value={value.value} style={{ lineHeight: '32px' }}>
														{value.label}
													</Checkbox>
												</Col>
											))}
										</Row>
									</Collapse.Panel>
								)
						)}
					</Collapse>
				</Checkbox.Group>
			</Form.Item>
		</Spin>
	);
};

export default PermissionsTable;
