import { ListParams } from 'app/interfaces';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface Props {
	filter: ListParams;
	onSeachChange?: (newFilter: ListParams) => void;
	onFilterChange?: (newFilter: ListParams) => void;
}

const StudentFilter = ({ filter, onSeachChange, onFilterChange }: Props) => {
	const [searchFilter, setSearchFilter] = useState('username');
	useEffect(() => {
		if (filter.q) {
			if (!onSeachChange) return;
			const newFilter = {
				...filter,
				page: 1,
				search: searchFilter,
			};
			onSeachChange(newFilter);
		}
		// eslint-disable-next-line
	}, [searchFilter]);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!onSeachChange) return;
		const newFilter = {
			...filter,
			page: 1,
			search: searchFilter,
			q: e.target.value,
		};
		onSeachChange(newFilter);
	};

	const handleSearchFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSearchFilter(e.target.value);
	};

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const [sort_by, sort_type] = e.target.value.split('.');

		if (!onFilterChange) return;

		const newFilter = {
			...filter,
			sort_by: sort_by || undefined,
			sort_type: (sort_type as 'asc' | 'desc') || undefined,
		};

		onFilterChange(newFilter);
	};

	const handleClearClick = () => {
		if (!onFilterChange) return;

		const newFilter = {
			...filter,
			sort_by: undefined,
			sort_type: undefined,
			page: 1,
			search: 'username',
			q: undefined,
		};
		setSearchFilter('username');
		onFilterChange(newFilter);
	};

	return (
		<div>
			{/* <Form.Group as={Col} lg={7} controlId="formGridCity">
				<Form.Label>Tìm kiếm</Form.Label>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<Form.Control
							as="select"
							value={searchFilter}
							custom
							onChange={handleSearchFilterChange}
						>
							<option value="username">Tên tài khoản</option>
							<option value="email">Email</option>
							<option value="fullname">Họ tên</option>
							<option value="phone">Số điện thoại</option>
						</Form.Control>
					</InputGroup.Prepend>
					<Form.Control
						placeholder="Từ khóa tìm kiếm..."
						onChange={handleSearchChange}
						value={filter.q || ''}
					/>
				</InputGroup>
			</Form.Group>

			<Form.Group as={Col} md={4} controlId="formGridState">
				<Form.Label>Sắp xếp</Form.Label>
				<Form.Control
					as="select"
					value={filter.sort_by ? `${filter.sort_by}.${filter.sort_by}` : ''}
					onChange={handleSortChange}
				>
					<option value="">Không</option>
					<option value="username.asc">Tên tài khoản A-Z</option>
					<option value="username.desc">Tên tài khoản Z-A</option>
					<option value="email.asc">Email A-Z</option>
					<option value="email.desc">Email Z-A</option>
					<option value="updated_at.asc">Cập nhật mới nhất</option>
					<option value="updated_at.desc">Cập nhật cũ nhất </option>
				</Form.Control>
			</Form.Group>

			<Form.Group as={Col} md={1} controlId="formGridState" className="text-right	">
				<Form.Label>&nbsp;</Form.Label>
				<div className="">
					<Button onClick={handleClearClick}>Clear</Button>
				</div>
			</Form.Group> */}
		</div>
	);
};

export default StudentFilter;
