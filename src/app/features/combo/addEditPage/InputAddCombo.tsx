import { Button, Col, Form, Popconfirm, Row, Select, Spin } from 'antd';
import { Combo } from 'app/interfaces';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import TableBase from 'app/utils/components/TableBase';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import {
	comboActions,
	selectComboActionLoading,
	selectComboSearchList,
} from '../redux/comboSlice';

const { Option } = Select;

interface Props {
    name:string;
    control: Control;
    data?: Combo[];
}

const InputAddCombo = ({name, control, data}: Props) => {
    const dispatch = useAppDispatch();
    const selectSearchList = useAppSelector(selectComboSearchList);
    const actionLoading = useAppSelector(selectComboActionLoading);

    const [options, setOptions] = React.useState<any>([]);
    const [value, setValue] = React.useState<number>();
    const [comboSelected, setComboSelected] = React.useState<Combo[]>(data || []);

    const {
        field: { onChange },
    } = useController<any>({ name, control });

    React.useEffect(() => {
		const element =
			selectSearchList?.map((combo) => (
				<Option
					key={`search-combo-${combo.id}`}
					value={combo.id as number}
					style={{ display: 'flex', alignItems: 'center' }}
					label={combo.name}
				>
					{combo.name}
				</Option>
			)) || [];
		setOptions(element);
	}, [selectSearchList]);

    const handleSearch = (name: string) => {
        if (name) {
            dispatch(comboActions.searchByName(name));
        }
    };

    const handleAddCombo = () => {
        if (!selectSearchList.length || !comboSelected) return;

		const selected: Combo = selectSearchList.filter(
			(combo: Combo) => (combo.id as number) === value
		)[0];

		if (comboSelected.find((combo) => combo.id === selected.id)) return;
		const result = [...comboSelected, selected];
		const idList = result.map((combo) => combo.id);
		onChange(idList);
		setComboSelected(result);
    }

    const handleDelete = (combo: Combo) => {
		const result = comboSelected?.filter((value) => value.id !== combo.id);
		console.log(`handleDelete`, comboSelected);
		setComboSelected(result);
	};

    const tableColumns = [
        {
            title:'ID',
            dataIndex:'id',
        },
        {
            title:'name',
            dataIndex:'name',
        },
        {
            title:'',
            dataIndex: 'operation',
			render: (text: string, record: Combo) =>
				comboSelected ? (
					<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
						<AiOutlineDelete />
					</Popconfirm>
			) : null,
        }
    ]

    return (
        <Row gutter={[16, 16]}>
        <Col span={16}>
            <Form.Item label="Combo" name={name}>
                <Select
                    optionLabelProp="label"
                    allowClear
                    showSearch
                    value={value}
                    placeholder={'Nhập tên combo để tìm...'}
                    defaultActiveFirstOption={false}
                    notFoundContent={actionLoading ? <Spin size="small" /> : null}
                    showArrow={false}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={(value) => {
                        setValue(value);
                    }}
                >
                    {options}
                </Select>
            </Form.Item>
        </Col>
        <Col span={6}>
            <Form.Item label="&nbsp;">
                <Button onClick={handleAddCombo}>Thêm Combo</Button>
            </Form.Item>
        </Col>
        <Col span={24}>
            <TableBase columns={tableColumns} dataSource={comboSelected} loading={false} />
        </Col>
    </Row>
    );
}

export default InputAddCombo;