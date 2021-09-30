import { Button, Col, Form, Row } from 'antd';
import { selectAgeRatingOptions } from 'app/features/ageRating/redux/ageRatingSlice';
import { selectUploadLoading } from 'app/features/upload/redux/uploadSlice';
import { ImageUpload, Movie } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import {
	InputField,
	SelectField,
	SliderField,
	UploadFileField,
} from 'app/utils/components/FormFields';
import { DatePickerField } from 'app/utils/components/FormFields/DatePickerField';
import { stringToSlug } from 'app/utils/helper';
import React from 'react';
import { useForm } from 'react-hook-form';
import { movieActions, selectMovieActionLoading } from '../../redux/movieSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Props {
	onCancel: () => void;
}

const formValidate = yup.object().shape({
	name: yup.string().required(),
	slug: yup.string().required(),
	posters: yup.array().required(),
});

const AddEditMovie = ({ onCancel }: Props) => {
	const dispatch = useAppDispatch();
	const ageRatingOptions = useAppSelector(selectAgeRatingOptions);
	const loading = useAppSelector(selectMovieActionLoading);
	const isUploading = useAppSelector(selectUploadLoading);

	const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<any>({
		resolver: yupResolver(formValidate),
	});

	const watchName = watch('name');

	React.useEffect(() => {
		const name = getValues('name');
		console.log(`name`, name);
		if (name) {
			setValue('slug', stringToSlug(name));
		} else {
			setValue('slug', name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchName, getValues]);

	const onSubmit = (data: Movie) => {
		console.log(`data`, data);

		dispatch(movieActions.create(data));
	};

	const handlePosterUpload = (list: ImageUpload[]) => {
		const result = list.map((el) => el.id);
		setValue('posters', result);
	};

	return (
		<div className="">
			<Row>
				<Col span={24}>
					<Form layout="vertical">
						{/* name */}
						<InputField name="name" label="Tên phim" control={control} required />

						{/* slug */}
						<InputField name="slug" label="Đường dẫn phim" control={control} required />

						{/* trailer */}
						<InputField name="trailer" label="Đường dẫn trailer phim" control={control} />

						{/* description */}
						<InputField name="description" label="Mô tả" control={control} />

						{/* running_time */}
						<SliderField
							name="running_time"
							label="Độ dài phim"
							control={control}
							max={300}
						/>

						<Row gutter={16}>
							<Col span={12}>
								{/* release_date */}
								<DatePickerField
									name="release_date"
									label="Ngày khởi chiếu"
									control={control}
									required
								/>
							</Col>
							<Col span={12}>
								{/* age_rating_id" */}
								<SelectField
									control={control}
									name="age_rating_id"
									label="Giới hạn độ tuổi"
									options={ageRatingOptions}
									required
								/>
							</Col>
						</Row>

						{/* Poster */}
						<UploadFileField
							name="thumbs"
							required
							label="Ảnh poster"
							hasUpload={handlePosterUpload}
							control={control}
						/>

						{/* posters */}
						<InputField name="posters" label="" control={control} hidden />
					</Form>
				</Col>

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
						loading={loading || isUploading}
						style={{ margin: '0 8px' }}
						onClick={handleSubmit(onSubmit)}
						type="primary"
					>
						Lưu
					</Button>
				</Col>
			</Row>
		</div>
	);
};

export default AddEditMovie;
