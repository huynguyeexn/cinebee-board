import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, PageHeader, Row, Spin, Form} from 'antd';
import * as yup from 'yup';
import React from 'react'
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Combo, ComboTicket } from 'app/interfaces';
import { InputField } from 'app/utils/components/FormFields';
/* import InputAddCombo from 'app/features/combo/components/InputAddCombo'; */
import { comboTicketActions } from '../redux/comboTicketSlice';
import { useAppDispatch } from 'app/redux/hooks';
import comboTicketApi from 'app/api/comboTicketApi';
import { stringToSlug } from 'app/utils/helper';
import comboApi from 'app/api/comboApi';

interface Props {}

const formValidate = yup.object().shape({
    name: yup.string().required('Bạn chưa điền giá Combo')
});

export const ComboTicketAddEditPage = (props: Props) => {
    const dispatch = useAppDispatch();

    //Variables
    const {id} = useParams<{id: string}>();
    const isEdit = Boolean(id);

    // State
    const [loading, setLoading] = React.useState(false);

    //Initial Value for Edit mode
    const [combosFull, setCombosFull] = React.useState<Combo[]>();
    const [initValues, setInitValues] = React.useState<Combo>();

    const {control, handleSubmit, reset, setValue, watch, getValues} = useForm<any>({
        resolver: yupResolver(formValidate),
        defaultValues: React.useMemo(() => initValues, [initValues]),
    });

    React.useEffect(() => {
		if (isEdit) {
			setLoading(true);
			(async () => {
				let response: Combo = await comboApi.getById(id);

				setCombosFull(response.combos_full || []);
				setInitValues(response);

				// Set form fields
				reset(response);
				setLoading(false);
			})();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, setValue, id]);

    const onSubmit = async (data: ComboTicket) => {
		if (isEdit) {
			dispatch(comboTicketActions.update(data));

		} else {
			dispatch(comboTicketActions.create(data));
		}
		setLoading(false);
	};

    return (
        <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={isEdit ? 'Cập nhật thông tin Combo' : 'Thêm mới sản phẩm combo vé'}
    >
        <Spin spinning={loading}>
            {!loading && (
                <Row gutter={[16,16]}>
                    {/* List table */}
                    <Col span={24}>
                        <Form layout="vertical">
									<InputField type="date" name="get_at" label="Ngày tạo" control={control} />

                                    <InputField name="price" label="Giá thêm Combo" control={control} />

									<InputField name="combos" label="Combo" value="1" control={control} />

									{/* <InputAddCombo name="combos" control={control} data={combosFull}/> */}


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

export default ComboTicketAddEditPage;
