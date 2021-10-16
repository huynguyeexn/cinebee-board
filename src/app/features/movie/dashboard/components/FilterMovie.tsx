import { Button, Col, Form } from 'antd';
import { MOVIE_STATUS } from 'app/constants';
import {
	ageRatingActions,
	selectAgeRatingOptions,
} from 'app/features/ageRating/redux/ageRatingSlice';
import { ListParams } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { OptionsProps, SelectField } from 'app/utils/components/FormFields';
import InputGroupSearch from 'app/utils/components/FormFields/InputGroupSearch';
import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { movieActions, selectMovieFilter } from '../../redux/movieSlice';

const FilterMovie = () => {
	const searchSelect: OptionsProps[] = [
		{
			label: 'Tên Phim',
			value: 'name',
			key: 'name',
		},
		{
			label: 'Đường dẫn',
			value: 'slug',
			key: 'slug',
		},
		{
			label: 'ID',
			value: 'id',
			key: 'id',
		},
	];

	// Redux
	const dispatch = useAppDispatch();
	const ageRatingOptions = useAppSelector(selectAgeRatingOptions);
	const filter = useAppSelector(selectMovieFilter);

	// Component State
	const [searchBy, setSearchBy] = React.useState<string>(searchSelect[0].value as string);

	// React Hook Form
	const { control, handleSubmit } = useForm<any>();

	// Get Age rating options
	React.useEffect(() => {
		dispatch(ageRatingActions.getList());
	}, [dispatch]);

	React.useEffect(() => {
		if (filter.q) {
			setFilter({ q: filter.q });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchBy]);

	// Helper method
	const setFilter = (value?: ListParams) => {
		const newFilter = {
			...filter,
			search: searchBy,
			...value,
			page: 1,
		};

		dispatch(movieActions.setFilterDebounce(newFilter));
	};

	// Form method
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFilter({ q: value });
	};
	const onSubmitFilter = (data: any) => {
		const { age_rating_id: age } = data;
		const newFilter: ListParams = {
			filter_by: 'age_rating_id',
			filter: age,
		};
		setFilter(newFilter);
	};

	return (
		<Form layout="inline" style={{ padding: '0' }}>
			<Col sm={24} md={8} style={{ padding: '0' }}>
				<InputGroupSearch
					name="search"
					inputPlaceHolder="Từ khóa cần tìm"
					inputIcon={<AiOutlineSearch />}
					selectOptions={searchSelect}
					selectValue={searchBy}
					onChangeSelect={setSearchBy}
					onChangeInput={handleSearchChange}
				/>
			</Col>
			<Col span={6}>
				<SelectField
					control={control}
					options={ageRatingOptions}
					name="age_rating_id"
					placeHolder="Giới hạn độ tuổi"
				></SelectField>
			</Col>
			<Form.Item>
				<Button type="primary" onClick={handleSubmit(onSubmitFilter)}>
					Lọc
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FilterMovie;
