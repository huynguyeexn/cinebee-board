import { Collapse, Spin } from 'antd';
import { Permissions } from 'app/interfaces';
import { useAppSelector } from 'app/redux/hooks';
import React, { ChangeEvent } from 'react';
import { Control } from 'react-hook-form';
import { selectPermissionsLoading, selectPermissionsOptions } from '../../redux/employeeRoleSlice';
interface Props {
	permissions_full: Permissions[];
	name: string;
	control: Control<any>;
}

const TabsConfig: { [key: string]: string } = {
	actors: 'Diễn viên',
	'age-ratings': 'Giới hạn độ tuổi',
	'customer-types': 'Hạng khách hàng',
	customers: 'Khách hàng',
	directors: 'Đạo diễn',
	employee: 'Nhân viên',
	genres: 'Thể loại phim',
	items: 'Thức ăn',
	'movie-actors': '',
	'movie-directors': '',
	'movie-genres': '',
	movies: 'Phim',
	role: 'Chức vụ',
	'room-status': 'Trạng thái phòng chiếu',
	rooms: 'Phòng chiếu',
	'seat-status': '',
	seats: '',
};

const PermissionsTable = ({ permissions_full, name, control }: Props) => {
	const loading = useAppSelector(selectPermissionsLoading);
	const options = useAppSelector(selectPermissionsOptions);
	const [checkboxSelect, setCheckboxSelect] = React.useState<number[]>([]);


	const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);
		const newState = checkboxSelect;
		if(newState.includes(value)){
			newState.filter(x => x !== value);
		}else{
			newState.push(value);
		}
		setCheckboxSelect(newState);
	}

	return (
		<Spin spinning={!options && loading}>
			<Collapse>
				{Object.keys(options).map((key: string, index: number) => (
					TabsConfig[key] &&
						<Collapse.Panel header={TabsConfig[key]} key={index}>
						{options[key].map(value => (
							<span  style={{margin: "0 16px 8px 0", display: 'inline-flex', justifyContent:"center", alignItems: "center"}}>
							<input type="checkbox"
							value={value.value}
							// options={options[key]}
							// defaultValue={permissions_full.map((x) => x.id as number)}
							onChange={handleOnchange}
							id={`${name}-${value.value}`}
							/>
							<label htmlFor={`${name}-${value.value}`}>
								{value.label}
							</label>
							</span>
							))}
					</Collapse.Panel>
				))}
			</Collapse>
		</Spin>
	);
};

export default PermissionsTable;
