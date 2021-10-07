import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, Spin } from 'antd';
import directorApi from 'app/api/directorApi';
import { Director } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { InputField } from 'app/utils/components/FormFields';
import { stringToSlug } from 'app/utils/helper';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { directorActions, selectDirectorActionLoading } from '../../redux/directorSlice';

interface Props {
	onCancel: () => void;
	isEdit?: boolean;
	data?: Director;
}

const formValidate = yup.object().shape({
	fullname: yup.string().required(),
	slug: yup.string().required(),
	avatar: yup.string().required(),
});

const AddEditDirector = ({ onCancel, isEdit = false, data }: Props) => {
	const dispatch = useAppDispatch();
	const saveLoading = useAppSelector(selectDirectorActionLoading);
	const [loading, setLoading] = React.useState(false);
	const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<any>({
		resolver: yupResolver(formValidate),
	});

	// For edit mode
	React.useEffect(() => {
		if (isEdit) {
			if (!data) return;
			setLoading(true);
			// get user and set form fields
			(async () => {
				const response: Director = await directorApi.getById(data);
				Object.keys(response).forEach((key) => {
					setValue(key, response[key as keyof Director]);
				});
				setLoading(false);
			})();
		}
	}, [isEdit, data, setValue]);

	// Convert slug
	const watchName = watch('fullname');
	React.useEffect(() => {
		const name = getValues('fullname');
		if (name) {
			setValue('slug', stringToSlug(name));
		} else {
			setValue('slug', name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchName, getValues]);

	const onSubmit = (data: Director) => {
		if (isEdit) {
			dispatch(directorActions.update(data));
		} else {
			dispatch(directorActions.create(data));
		}
	};

	return (
		<Spin spinning={loading}>
			<Form layout="vertical">
				<InputField control={control} name="fullname" label="Tên đạo diễn" required />

				<InputField control={control} name="slug" label="Đường dẫn" required />

				<InputField control={control} name="avatar" label="Đường dẫn ảnh đại diện" required />

				{/* Form actions */}
				<Col span={24} style={{ textAlign: 'right' }}>
					<Button style={{ margin: '0 8px' }} onClick={() => reset()} type="link">
						Clear
					</Button>
					<Button
						onClick={() => {
							onCancel();
							reset();
						}}
					>
						Hủy
					</Button>
					<Button
						loading={saveLoading}
						style={{ margin: '0 8px' }}
						onClick={handleSubmit(onSubmit)}
						type="primary"
					>
						Lưu
					</Button>
				</Col>
			</Form>
		</Spin>
	);
};

export default AddEditDirector;
