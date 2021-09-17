import { ListParams } from 'app/interfaces';
import React, { ChangeEvent, useState } from 'react';
import { Col, Form, InputGroup } from 'react-bootstrap';

interface Props {
	filter: ListParams;
	onSeachChange?: (newFilter: ListParams) => void;
	onFilterChange?: (newFilter: ListParams) => void;
}

const StudentFilter = ({ filter, onSeachChange, onFilterChange }: Props) => {
	const [searchFilter, setSearchFilter] = useState('username');

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

	return (
		<Form.Row>
			<Form.Group as={Col} lg={6} controlId="formGridCity">
				<Form.Label>Tìm kiếm</Form.Label>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<Form.Control
							as="select"
							defaultValue="Sắp xếp..."
							custom
							value={searchFilter}
							onChange={handleSearchFilterChange}
						>
							<option value="username">Tên tài khoản</option>
							<option value="email">Email</option>
							<option value="fullname">Họ tên</option>
							<option value="phone">Số điện thoại</option>
						</Form.Control>
					</InputGroup.Prepend>
					<Form.Control placeholder="Từ khóa tìm kiếm..." onChange={handleSearchChange} />
				</InputGroup>
			</Form.Group>

			<Form.Group as={Col} controlId="formGridState">
				<Form.Label>Sắp xếp</Form.Label>
				<Form.Control as="select" defaultValue="Sắp xếp...">
					<option>Không</option>
					<option>Email A-Z</option>
					<option>Email Z-A</option>
					<option>Cập nhật mới nhất</option>
					<option>Cập nhật cũ nhất </option>
				</Form.Control>
			</Form.Group>

			<Form.Group as={Col} controlId="formGridZip">
				<Form.Label>Lọc theo</Form.Label>
				<Form.Control as="select" defaultValue="Sắp xếp...">
					<option>Không</option>
					<option>Giới tính: Nam</option>
					<option>Giới tính: Nữ</option>
				</Form.Control>
			</Form.Group>
		</Form.Row>
	);
};

export default StudentFilter;
