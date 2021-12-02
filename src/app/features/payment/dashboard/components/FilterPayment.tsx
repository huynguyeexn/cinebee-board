import { Col, Input, Row, Select, Form } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { paymentActions, selectPaymentFilter } from '../../redux/paymentSlice';
import { ChangeEvent } from 'react-router/node_modules/@types/react';
import { AiOutlineSearch } from 'react-icons/ai';

const { Option } = Select;

interface searchType {
    title: string;
    key: string;
}

const FilterPayment = () => {
    const searchType: searchType[] = [
        {
            title: "Ngày",
            key: "booking_at"
        },
        {
            title: "ID",
            key: "id"
        },
        {
            title: "Nhân Viên",
            key: "employee_id"
        },
        {
            title: "Khách Hàng",
            key: "customer_id"
        },
        {
            title: "Vé Combo",
            key: "combo_ticket_id"
        },
        {
            title: "Vé Xem Phim",
            key: "movie_ticket_id"
        }
    ];

    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectPaymentFilter);

    const [searchBy, setSearchBy] = React.useState<string>(searchType[0].key);
    
    React.useEffect(() => {
        if(filter.q){
            const newFilter = {
                ...filter,
                q: filter.q,
                search: searchBy
            }
            dispatch(paymentActions.setFilterDebounce(newFilter));
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchBy]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => { 
        const value = event.target.value;

        const newFilter = {
            ...filter,
            q: value,
            search: searchBy
        }
        dispatch(paymentActions.setFilterDebounce(newFilter))
    }

    return (
		<Row gutter={16} style={{ width: '100%' }}>
			<Col sm={24} md={12}>
				<Form layout="vertical">
					<Form.Item label="Tìm kiếm" name="search" style={{ marginBottom: 0 }}>
						<Input.Group compact>
							<Select onChange={setSearchBy} value={searchBy} style={{ width: '120px' }}>
								{searchType.map((type) => (
									<Option key={type.key} value={type.key}>
										{type.title}
									</Option>
								))}
							</Select>
							<Input
								style={{ width: 'auto' }}
								placeholder="Từ khóa tìm kiếm..."
								suffix={<AiOutlineSearch />}
								onChange={handleSearchChange}
							/>
						</Input.Group>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default FilterPayment;