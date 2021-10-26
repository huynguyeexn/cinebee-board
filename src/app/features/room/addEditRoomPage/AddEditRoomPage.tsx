import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, PageHeader, Row, Typography } from 'antd';
import { useAppDispatch } from 'app/redux/hooks';
import { InputField } from 'app/utils/components/FormFields';
import { makeRows } from 'app/utils/helper';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import RoomShowcase from '../components/RoomShowcase';
import { roomActions } from '../redux/roomSlice';

const formValidate = yup.object().shape({
	name: yup.string().required('Bạn chưa điền tên rạp'),
	rows: yup.mixed().required('Bạn chưa điền số hàng'),
	cols: yup.mixed().required('Bạn chưa điền số cột'),
	price: yup.mixed().required('Bạn chưa điền giá vé'),
});

const AddEditRoomPage = () => {
	const dispatch = useAppDispatch();
	const [, forceUpdate] = React.useState({});
	const [rows, setRows] = React.useState(5);
	const [cols, setCols] = React.useState(5);

	// Redux Hook Form
	const { control, handleSubmit, watch } = useForm<any>({
		resolver: yupResolver(formValidate),
		defaultValues: { rows: 5, cols: 5 },
	});

	const watchFields = watch(['rows', 'cols']);

	React.useEffect(() => {
		setRows(+watchFields[0]);
		setCols(+watchFields[1]);
	}, [watchFields]);

	// To disable submit button at the beginning.
	React.useEffect(() => {
		forceUpdate({});
	}, []);

	const onSubmit = (values: any) => {
		let seats: any[] = [];
		makeRows(rows).forEach((row, rowIdx) => {
			for (let colIndex = 0; colIndex < cols; colIndex++) {
				seats.push({
					label: `${row}${colIndex + 1}`,
					index: `[${rowIdx}][${colIndex}]`,
				});
			}
		});

		const newData = {
			...values,
			seats: JSON.stringify(seats),
		};
		dispatch(roomActions.create(newData));
	};

	return (
		<PageHeader
			ghost={false}
			onBack={() => window.history.back()}
			title="Thêm mới rạp phim"
			extra={[
				<Typography.Text>Số ghế: {rows * cols}</Typography.Text>,
				<Button style={{ margin: '0 8px' }} onClick={handleSubmit(onSubmit)} type="primary">
					Lưu
				</Button>,
			]}
		>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Form layout="inline">
						{/* name */}
						<InputField name="name" label="Tên rạp" control={control} required />

						{/* rows */}
						<InputField
							name="rows"
							placeholder="Số hàng"
							label="Hàng"
							type="number"
							control={control}
							required
						/>
						{/* cols */}
						<InputField
							name="cols"
							placeholder="Số cột"
							label="Cột"
							type="number"
							control={control}
							required
						/>

						{/* price */}
						<InputField
							name="price"
							placeholder="Giá vé"
							label="Giá vé (VNĐ)"
							type="number"
							control={control}
							required
						/>
					</Form>
				</Col>
				<Col span={24}>
					{/* <p>Xem trước</p> */}
					<RoomShowcase rows={rows} cols={cols} />
				</Col>
			</Row>
		</PageHeader>
	);
};

export default AddEditRoomPage;
