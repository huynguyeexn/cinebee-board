import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, PageHeader, Row, Spin, Form} from 'antd';
import * as yup from 'yup';
import React from 'react'
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Combo, Item } from 'app/interfaces';
import { InputField } from 'app/utils/components/FormFields';
import InputAddItem from 'app/features/item/components/InputAddItem';
import { comboActions } from '../redux/comboSlice';
import { useAppDispatch } from 'app/redux/hooks';
import comboApi from 'app/api/comboApi';
import { stringToSlug } from 'app/utils/helper';


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
	const [isSaving, setIsSaving] = React.useState(false);

    // Initial Value for Edit mode
    const [itemsFull, setItemsFull] = React.useState<Item[]>();
    const [initValues, setInitValues] = React.useState<Combo>();

    //Redux Form Hook
    const {control, handleSubmit, reset, setValue, watch, getValues} = useForm<any>({
        resolver: yupResolver(formValidate),
        defaultValues: React.useMemo(() => initValues, [initValues]),
    });



    React.useEffect(() => {
		if (isEdit) {
			setLoading(true);
			(async () => {
				let response: Combo = await comboApi.getById(id);

				setItemsFull(response.items_full || []);
				setInitValues(response);

				// Set form fields
				reset(response);
				setLoading(false);
			})();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, setValue, id]);

    const watchName = watch('name');
	const watchSlug = watch('slug');
	React.useEffect(() => {
		const name = getValues('name');
		if (name) {
			setValue('slug', stringToSlug(name));
		} else {
			setValue('slug', name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchName, getValues]);
	React.useEffect(() => {
		const slug = getValues('slug');
		if (slug) {
			setValue('slug', stringToSlug(slug));
		} else {
			setValue('slug', slug);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchSlug, getValues]);

	const onSubmit = async (data: Combo) => {
		setIsSaving(true);
		if (isEdit) {
			dispatch(comboActions.update(data));

		} else {
			dispatch(comboActions.create(data));
		}
		setIsSaving(false);
	};

    return (
        <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={isEdit ? 'Cập nhật thông tin Combo' : 'Thêm mới sản phẩm combo'}
    >
        <Spin spinning={loading}>
            {!loading && (
                <Row gutter={[16,16]}>
                    {/* List table */}
                    <Col span={24}>
                        <Form layout="vertical">

                                    <InputField name="name" label="Tên Combo" control={control} required />

                                    <InputField name="price" label="Giá thêm Combo" control={control} />

                                    <InputField name="slug" label="Url Combo" control={control} />

									<InputAddItem name="items" control={control} data={itemsFull}/>


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
										loading={loading || isSaving}
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