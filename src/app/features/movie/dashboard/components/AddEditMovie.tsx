import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, Row, Tabs } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import fileUploadApi from 'app/api/fileUploadApi';
import InputAddActor from 'app/features/actors/components/InputAddActor';
import { selectAgeRatingOptions } from 'app/features/ageRating/redux/ageRatingSlice';
import InputAddGenre from 'app/features/genres/component/InputAddGenre';
import { ImageUpload, Movie } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import {
	InputField,
	SelectField,
	SliderField,
	UploadFileField,
} from 'app/utils/components/FormFields';
import { DatePickerField } from 'app/utils/components/FormFields/DatePickerField';
import { minutesToHoursMinutes, stringToSlug } from 'app/utils/helper';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { movieActions, selectMovieActionLoading } from '../../redux/movieSlice';

const { TabPane } = Tabs;
interface Props {
	onCancel: () => void;
}

const formValidate = yup.object().shape({
	name: yup.string().required('Bạn chưa điền tên phim'),
	slug: yup.string().required('Bạn chưa điền đường dẫn phim'),
	release_date: yup.mixed().required('Bạn chưa chọn ngày khởi chiếu'),
	age_rating_id: yup.number().required('Bạn chưa chọn giới hạn độ tuổi'),
	posters: yup.mixed().required('Bạn chưa chọn hình ảnh Posters'),
	backdrops: yup.mixed().required('Bạn chưa chọn hình ảnh Backdrops'),
});

const AddEditMovie = ({ onCancel }: Props) => {
	const dispatch = useAppDispatch();
	const ageRatingOptions = useAppSelector(selectAgeRatingOptions);
	const loading = useAppSelector(selectMovieActionLoading);

	const [isSaving, setIsSaving] = React.useState(false);
	const [runningTimeConvert, setRunningTimeConvert] = React.useState('');

	const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<any>({
		resolver: yupResolver(formValidate),
	});

	// Convert running time
	const runningTime = watch('running_time');
	React.useEffect(() => {
		setRunningTimeConvert(minutesToHoursMinutes(runningTime));
	}, [runningTime]);

	// Convert name to slug
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

	const onSubmit = async (data: Movie) => {
		setIsSaving(true);

		// Upload Images
		const posterResponse = await handlePosterUpload(data);
		const backdropsResponse = await handleBackdropUpload(data);

		// Map images response to number array
		const newData = {
			...data,
			posters: posterResponse.map((poster) => poster.id) as number[],
			backdrops: backdropsResponse.map((backdrop) => backdrop.id) as number[],
		};

		// Save movie
		dispatch(movieActions.create(newData));
		setIsSaving(false);
	};

	// Image upload handle
	const handlePosterUpload = async (data: Movie): Promise<ImageUpload[]> => {
		const response: { data: ImageUpload[] } = await fileUploadApi.image(
			data.posters as UploadFile<any>[]
		);
		return response.data;
	};
	const handleBackdropUpload = async (data: Movie): Promise<ImageUpload[]> => {
		const response: { data: ImageUpload[] } = await fileUploadApi.image(
			data.backdrops as UploadFile<any>[]
		);
		return response.data;
	};

	return (
		<Form layout="vertical">
			<Tabs defaultActiveKey="1">
				<TabPane tab="Thông tin phim" key="1">
					{/* name */}
					<InputField name="name" label="Tên phim" control={control} required />

					{/* slug */}
					<InputField name="slug" label="Đường dẫn phim" control={control} required />

					{/* trailer */}
					<InputField name="trailer" label="Đường dẫn trailer phim" control={control} />

					{/* description */}
					<InputField name="description" label="Mô tả" control={control} rows={4} />

					{/* running_time */}
					<small>{runningTimeConvert}</small>
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
						name="posters"
						required
						label="Ảnh poster (1)"
						hasUpload={handlePosterUpload}
						control={control}
						maxCount={1}
					/>

					{/* Backdrops */}
					<UploadFileField
						name="backdrops"
						required
						label="Ảnh phông nền"
						hasUpload={handleBackdropUpload}
						control={control}
					/>
				</TabPane>
				<TabPane tab="Khác" key="2">
					{/* Genres */}
					<InputAddGenre name="genres" control={control} />
					{/* Actors */}
					<InputAddActor name="actors" control={control} />
					{/* Directors */}
				</TabPane>
			</Tabs>

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
					loading={loading || isSaving}
					style={{ margin: '0 8px' }}
					onClick={handleSubmit(onSubmit)}
					type="primary"
				>
					Lưu
				</Button>
			</Col>
		</Form>
	);
};

export default AddEditMovie;
