import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, PageHeader, Row, Spin, Tabs, Form} from 'antd';
import * as yup from 'yup';
import React from 'react'
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Combo, Item } from 'app/interfaces';
import { InputField } from 'app/utils/components/FormFields';
import InputAddItem from 'app/features/item/components/InputAddItem';
import { comboActions } from '../redux/comboSlice';
import { useAppDispatch } from 'app/redux/hooks';



const { TabPane } =Tabs;

interface Props {}

const formValidate = yup.object().shape({
    name: yup.string().required('Bạn chưa điền tên Combo')
})

export const ComboAddEditPage = (props: Props) => {

    const dispatch = useAppDispatch();

    // Variables
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);

    // State
    const [loading, setLoading] = React.useState(false);
    const [runningTimeCovert, setRunningTimeCovert] = React.useState('');

    // Initial Value for Edit mode
    const [itemsFull, setItemsFull] = React.useState<Item[]>();
    const [initValues, setInitValues] = React.useState<Combo>();

    //Redux Form Hook
    const {control, handleSubmit, reset, setValue, watch, getValues} = useForm<any>({
        resolver: yupResolver(formValidate),
        defaultValues: React.useMemo(() => initValues, [initValues]),
    });
    const onSubmit = async (data: Combo) => {
		if (isEdit) {
			dispatch(comboActions.update(data));
		} else {
			dispatch(comboActions.create(data));
		}
		setLoading(false);
	};

    return (
        <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={isEdit ? 'Cập nhật thông tin phim' : 'Thêm mới phim'}
        extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
                Primary
            </Button>,
        ]}
    >
        <Spin spinning={loading}>
            {!loading && (
                <Row gutter={[16,16]}>
                    {/* List table */}
                    <Col span={24}>
                        <Form layout="vertical">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thông tin Combo" key="1">

                                    <InputField name="name" label="Tên Combo" control={control} required />

                                    <InputField name="price" label="Giá thêm Combo" control={control} />

                                    <InputField name="slug" label="Url Combo" control={control} />

                                </TabPane>

                                <TabPane tab="Thông tin sản phẩm" key="2">

                                    {/* <InputAddCombo name="combos" label="Tên Combo" control={control} required /> */}

                                    <InputAddItem name="items" control={control} data={itemsFull}/>


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
										loading={loading}
										style={{ margin: '0 8px' }}
										onClick={handleSubmit(onSubmit)}
										type="primary"
									>
										Lưu
									</Button>
								</Col>
                        </Form>
                    </Col>
                </Row>
            )}
        </Spin>
        </PageHeader>
    );
}

export default ComboAddEditPage;