import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, Spin } from 'antd';
import genreApi from 'app/api/genreApi';
import { Genre } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { InputField } from 'app/utils/components/FormFields';
import { stringToSlug } from 'app/utils/helper';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { genreActions, selectGenreActionLoading } from '../../redux/genreSlice';

interface Props {
	onCancel: () => void;
	isEdit?: boolean;
	data?: Genre;
}

const formValidate = yup.object().shape({
	name: yup.string().required(),
	slug: yup.string().required(),
});

const AddEditGenre = ({ onCancel, isEdit = false, data }: Props) => {
	const dispatch = useAppDispatch();
	const saveLoading = useAppSelector(selectGenreActionLoading);
	const [loading, setLoading] = React.useState(false);
	const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<any>({
		resolver: yupResolver(formValidate),
	});

	// For edit mode
	React.useEffect(() => {
		if (isEdit) {
			if (!data) return;
			setLoading(true);
			(async () => {
				const response: Genre = await genreApi.getById(data);
				Object.keys(response).forEach((key) => {
					setValue(key, response[key as keyof Genre]);
				});
				setLoading(false);
			})();
		}
	}, [isEdit, data, setValue]);

	// Convert slug
	const watchName = watch('name');
	React.useEffect(() => {
		const name = getValues('name');
		if (name) {
			setValue('slug', stringToSlug(name));
		} else {
			setValue('slug', name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchName, getValues]);

	const onSubmit = (data: Genre) => {
		if (isEdit) {
			dispatch(genreActions.update(data));
		} else {
			dispatch(genreActions.create(data));
		}
	};

	return (
		<Spin spinning={loading}>
			<Form layout="vertical">
				<InputField control={control} name="name" label="Thể loại phim" required />

				<InputField control={control} name="slug" label="Đường dẫn" required />

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

export default AddEditGenre;
