import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Spin, Form } from 'antd';
import itemApi from 'app/api/itemApi';
import { Item } from 'app/interfaces'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { InputField } from 'app/utils/components/FormFields';
import { stringToSlug } from 'app/utils/helper';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { itemActions, selectItemListLoading } from '../../redux/itemSilce';

interface Props {
    onCancel: () => void;
    isEdit?: boolean;
    data?: Item;
}

const formValidate = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    slug: yup.string().required(),
});

const AddEditItem = ({ onCancel, isEdit = false, data}: Props) => {
    const dispatch = useAppDispatch();
    const saveLoading = useAppSelector(selectItemListLoading);
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit, reset, setValue, watch, getValues} = useForm<any>({
        resolver: yupResolver(formValidate),
    });

    // For edit
    React.useEffect(() => {
        if (isEdit) {
            if (!data) return;
            setLoading(true);
            // get user and set form fields
            (async () => {
                const response:Item = await itemApi.getById(data);
                Object.keys(response).forEach((key) => {
                    setValue(key, response[key as keyof Item]);
                });
                setLoading(false);
            })();
        }
    }, [isEdit, data, setValue]);

    //convert to slug
    const watchName = watch('name');
    React.useEffect(() => {
        const name = getValues('name');
        if(name) {
            setValue('slug', stringToSlug(name));
        } else {
            setValue('slug', name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchName, getValues]);

    const onSubmit = async (data: Item) => {
        if (isEdit) {
            dispatch(itemActions.update(data));
        } else {
            dispatch(itemActions.create(data));
        }
    };

    return (
    <Spin spinning={loading}>
        <Form layout="vertical">
            <InputField control={control} name="name" label="Tên đồ ăn" required />

            <InputField control={control} name="price" label="Giá" />

            <InputField control={control} name="slug" label="Url web" />

            <Col span={24} style={{ textAlign: 'right' }}>
                <Button style={{ margin: '0 8px' }} onClick={() => reset()} type="link">
                    Clear
                </Button>
                <Button
                    onClick={() => {
                        onCancel();
                        reset();
                    }}
                >
                    Hủy
                </Button>
                <Button
                    loading={saveLoading}
                    style={{ margin: '0 8px'}}
                    onClick={handleSubmit(onSubmit)}
                    type="primary"
                >
                    Lưu
                </Button>
            </Col>
        </Form>
    </Spin>
    )
}

export default AddEditItem;