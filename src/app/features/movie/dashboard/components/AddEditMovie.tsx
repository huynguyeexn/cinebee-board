import { Button, Col, Row, Form } from 'antd';
import { selectAgeRatingOptions } from 'app/features/ageRating/redux/ageRatingSlice';
import { Movie } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { InputField, SelectField, SliderField } from 'app/utils/components/FormFields';
import { DatePickerField } from 'app/utils/components/FormFields/DatePickerField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { movieActions, selectMovieActionLoading } from '../../redux/movieSlice';

interface Props {
	onCancel: () => void;
}

const AddEditMovie = ({ onCancel }: Props) => {
	const dispatch = useAppDispatch();
	const ageRatingOptions = useAppSelector(selectAgeRatingOptions);
	const loading = useAppSelector(selectMovieActionLoading);

	const { control, handleSubmit, reset } = useForm({});

	const onSubmit = (data: Movie) => {
		dispatch(movieActions.getList({}));
	};
	return (
		<div className="">
			<Row>
				<Col span={24}>
					<Form layout="vertical">
						{/* name */}
						<InputField name="name" label="Tên phim" control={control} />
						{/* slug */}
						<InputField name="slug" label="Đường dẫn" control={control} />

						{/* trailer */}
						<InputField name="trailer" label="Đường dẫn trailer phim" control={control} />

						{/* thumbnail */}
						<InputField name="thumbnail" label="Đường dẫn ảnh poster" control={control} />

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
								/>
							</Col>
							<Col span={12}>
								{/* age_rating_id" */}
								<SelectField
									control={control}
									name="age_rating_id"
									label="Giới hạn độ tuổi"
									options={ageRatingOptions}
								/>
							</Col>
						</Row>
					</Form>
				</Col>
				<Col span={24} style={{ textAlign: 'right' }}>
					<Button style={{ margin: '0 8px' }} onClick={reset} type="link">
						Clear
					</Button>
					<Button onClick={onCancel}>Hủy</Button>
					<Button
						loading={loading}
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
