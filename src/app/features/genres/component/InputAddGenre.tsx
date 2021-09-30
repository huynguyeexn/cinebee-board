import { Spin } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { SelectField } from 'app/utils/components/FormFields';
import React from 'react';
import { Control } from 'react-hook-form';
import {
	genreActions,
	selectGenreActionLoading,
	selectGenreSearchList,
} from '../redux/genreSlice';

interface Props {
	name: string;
	control: Control;
}

const InputAddGenre = ({ name, control }: Props) => {
	const dispatch = useAppDispatch();

	const actionLoading = useAppSelector(selectGenreActionLoading);
	const selectSearchList = useAppSelector(selectGenreSearchList);

	React.useEffect(() => {
		dispatch(genreActions.searchByName(''));
	}, []);

	return (
		<Spin spinning={actionLoading}>
			<SelectField
				mode="tags"
				control={control}
				options={selectSearchList}
				name={name}
				label="Chọn thể loại"
			/>
		</Spin>
	);
};

export default InputAddGenre;
