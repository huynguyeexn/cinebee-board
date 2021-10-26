import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, PageHeader, Row, Spin, Tabs } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import fileUploadApi from 'app/api/fileUploadApi';
import movieApi from 'app/api/movieApi';
import { MOVIE_STATUS } from 'app/constants';
import InputAddActor from 'app/features/actors/components/InputAddActor';
import {
	ageRatingActions,
	selectAgeRatingOptions,
} from 'app/features/ageRating/redux/ageRatingSlice';
import InputAddDirector from 'app/features/director/components/InputAddDirector';
import InputAddGenre from 'app/features/genres/component/InputAddGenre';
import { Actor, Director, ImageUpload, Movie } from 'app/interfaces';
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
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { movieActions } from '../redux/movieSlice';

const { TabPane } = Tabs;

interface Props {}

const formValidate = yup.object().shape({
	name: yup.string().required('Bạn chưa điền tên phim'),
	slug: yup.string().required('Bạn chưa điền đường dẫn phim'),
	release_date: yup.mixed().required('Bạn chưa chọn ngày khởi chiếu'),
	age_rating_id: yup.number().required('Bạn chưa chọn giới hạn độ tuổi'),
	status: yup.number().required('Bạn chưa chọn trạng thái phim'),
	posters: yup.mixed().required('Bạn chưa chọn hình ảnh Posters'),
	backdrops: yup.mixed().required('Bạn chưa chọn hình ảnh Backdrops'),
});

const MovieAddEditPage = (props: Props) => {
	// Redux
	const dispatch = useAppDispatch();
	const ageRatingOptions = useAppSelector(selectAgeRatingOptions);

	// Variables
	const { id } = useParams<{ id: string }>();
	const isEdit = Boolean(id);
	const movieStatusOptions = MOVIE_STATUS.map((status, idx) => ({ label: status, value: idx }));

	// State
	const [loading, setLoading] = React.useState(false);
	const [isSaving, setIsSaving] = React.useState(false);
	const [runningTimeConvert, setRunningTimeConvert] = React.useState('');

	// Initial Value for Edit mode
	const [actorsFull, setActorsFull] = React.useState<Actor[]>();
	const [directorsFull, setDirectorsFull] = React.useState<Director[]>();
	const [postersFull, setPostersFull] = React.useState<ImageUpload[]>();
	const [backdropsFull, setBackdropsFull] = React.useState<ImageUpload[]>();
	const [initValues, setInitValues] = React.useState<Movie>();

	// Redux Hook Form
	const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<any>({
		resolver: yupResolver(formValidate),
		defaultValues: React.useMemo(() => initValues, [initValues]),
	});

	React.useEffect(() => {
		dispatch(ageRatingActions.getList());
	}, [dispatch]);

	// Get initial value for Edit mode
	React.useEffect(() => {
		if (isEdit) {
			setLoading(true);
			(async () => {
				let response: Movie = await movieApi.getById(id);

				setActorsFull(response.actors_full || []);
				setDirectorsFull(response.directors_full || []);
				setPostersFull(response.posters_full || []);
				setBackdropsFull(response.backdrops_full || []);
				setInitValues(response);

				// Set form fields
				reset(response);
				setLoading(false);
			})();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, setValue, id]);

	// Convert running time
	const runningTime = watch('running_time');
	React.useEffect(() => {
		setRunningTimeConvert(minutesToHoursMinutes(runningTime));
	}, [runningTime]);

	// Convert name to slug
	const watchName = watch('name');
	const watchSlug = watch('slug');
	React.useEffect(() => {
		const name = getValues('name');
		if (name) {
			setValue('slug', stringToSlug(name));
		} else {
			setValue('slug', name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchName, getValues]);
	React.useEffect(() => {
		const slug = getValues('slug');
		if (slug) {
			setValue('slug', stringToSlug(slug));
		} else {
			setValue('slug', slug);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchSlug, getValues]);

	// Form Methods
	const onSubmit = async (data: Movie) => {
		setIsSaving(true);

		// Upload Images
		const posterResponse = await handlePosterUpload(data);
		const backdropsResponse = await handleBackdropUpload(data);

		// Map images response to number array
		const newData = {
			...data,
			posters: (posterResponse?.map((poster) => poster.id) as number[]) || data.posters,
			backdrops: (backdropsResponse?.map((backdrop) => backdrop.id) as number[]) || data.backdrops,
		};

		// Save movie
		if (isEdit) {
			dispatch(movieActions.update(newData));
		} else {
			dispatch(movieActions.create(newData));
		}
		setIsSaving(false);
	};

	// Image upload handle
	const handlePosterUpload = async (data: Movie): Promise<ImageUpload[] | undefined> => {
		// Filter image not uploaded
		let posters: Array<any> = data.posters;
		posters = posters.filter((image) => typeof image === 'object' && Boolean(image.uid));

		console.log(`handlePosterUpload`, posters);
		const response: { data: ImageUpload[] } = await fileUploadApi.image(
			posters as UploadFile<any>[]
		);
		return response.data;
	};
	const handleBackdropUpload = async (data: Movie): Promise<ImageUpload[]> => {
		// Filter image not uploaded

		let backdrops: Array<any> = data.backdrops;
		backdrops = backdrops.filter((image) => typeof image === 'object' && Boolean(image.uid));
		console.log(`handleBackdropUpload`, backdrops);

		const response: { data: ImageUpload[] } = await fileUploadApi.image(
			backdrops as UploadFile<any>[]
		);
		return response.data;
	};

	return (
		<PageHeader
			ghost={false}
			onBack={() => window.history.back()}
			title={isEdit ? 'Cập nhật thông tin phim' : 'Thêm mới phim'}
		>
			<Spin spinning={loading}>
				{!loading && (
					<Row gutter={[16, 16]}>
						{/* List table */}
						<Col span={24}>
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
											<Col span={8}>
												{/* release_date */}
												<DatePickerField
													name="release_date"
													label="Ngày khởi chiếu"
													control={control}
													required
												/>
											</Col>
											<Col span={8}>
												{/* age_rating_id */}
												<SelectField
													control={control}
													name="age_rating_id"
													label="Giới hạn độ tuổi"
													options={ageRatingOptions}
													required
												/>
											</Col>

											<Col span={8}>
												{/* status */}
												<SelectField
													control={control}
													name="status"
													label="Trạng thái"
													options={movieStatusOptions}
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
											data={postersFull}
											control={control}
											maxCount={1}
										/>

										{/* Backdrops */}
										<UploadFileField
											name="backdrops"
											required
											label="Ảnh phông nền"
											hasUpload={handleBackdropUpload}
											data={backdropsFull}
											control={control}
										/>
									</TabPane>
									<TabPane tab="Thông tin thêm" key="2">
										{/* Genres */}
										<InputAddGenre name="genres" control={control} />
										{/* Actors */}
										<InputAddActor name="actors" control={control} data={actorsFull} />
										{/* Directors */}
										<InputAddDirector name="directors" control={control} data={directorsFull} />
									</TabPane>
								</Tabs>

								{/* Form actions */}
								<Col span={24} style={{ textAlign: 'right' }}>
									<Button style={{ margin: '0 8px' }} onClick={() => reset()} type="link">
										Clear
									</Button>
									<Button
										onClick={() => {
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
										Lưu hả
									</Button>
								</Col>
							</Form>
						</Col>
					</Row>
				)}
			</Spin>
		</PageHeader>
	);
};

export default MovieAddEditPage;
