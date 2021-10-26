import { Col, Form, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { OptionsProps } from 'app/utils/components/FormFields';
import InputGroupSearch from 'app/utils/components/FormFields/InputGroupSearch';
import React, { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { actorActions, selectActorFilter } from '../../redux/actorSlice';

const FilterActor = () => {
	const searchType: OptionsProps[] = [
		{
			label: 'Tên diễn viên',
			value: 'fullname',
			key: 'fullname',
		},
		{
			label: 'ID',
			value: 'id',
			key: 'id',
		},
	];

	const dispatch = useAppDispatch();
	const filter = useAppSelector(selectActorFilter);

	const [searchBy, setSearchBy] = React.useState<string>(searchType[0].value as string);

	React.useEffect(() => {
		if (filter.q) {
			const newFilter = {
				...filter,
				q: filter.q,
				search: searchBy,
			};

			dispatch(actorActions.setFilterDebounce(newFilter));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchBy]);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		const newFilter = {
			...filter,
			q: value,
			search: searchBy,
		};

		dispatch(actorActions.setFilterDebounce(newFilter));
	};

	return (
		<Row gutter={16} style={{ width: '100%' }}>
			<Col sm={24} md={12}>
				<Form layout="vertical">
					<InputGroupSearch
						label="TÌm kiếm diễn viên"
						name="search"
						inputPlaceHolder="Từ khóa cần tìm"
						inputIcon={<AiOutlineSearch />}
						selectOptions={searchType}
						selectValue={searchBy}
						onChangeSelect={setSearchBy}
						onChangeInput={handleSearchChange}
					/>
				</Form>
			</Col>
		</Row>
	);
};

export default FilterActor;
