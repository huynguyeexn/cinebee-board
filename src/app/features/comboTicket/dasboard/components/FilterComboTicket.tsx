import { Col, Input, Row, Form, Select} from 'antd'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { ChangeEvent } from 'react-router/node_modules/@types/react'
import { comboTicketActions, selectComboTicketFilter } from '../../redux/comboTicketSlice'

const { Option } = Select;

interface searchType {
    title: string;
    key: string;
}

export const FilterComboTicket = () => {
    const searchType: searchType[] = [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: 'Ngày',
            key: 'get_at'
        },
        {
            title: 'Số Lượng',
            key: 'quantity'
        },
        {
            title: 'Giá',
            key: 'price'
        },
        {
            title: 'Đơn Hàng',
            key: 'order_id'
        },
        {
            title: 'Combo',
            key: 'combo_id'
        },
    ]

    const dispatch = useAppDispatch()
    const filter = useAppSelector(selectComboTicketFilter)

    const [searchBy, setSearchBy] = React.useState<string>(searchType[0].key)

    React.useEffect(() => {
        if(filter.q){
            const newFilter = {
                ...filter,
                q: filter.q,
                search: searchBy
            }
            dispatch(comboTicketActions.setFilterDebounce(newFilter))
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchBy])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        const newFilter = {
            ...filter,
            q: value,
            search: searchBy
        }
        dispatch(comboTicketActions.setFilter(newFilter))
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
    )
}