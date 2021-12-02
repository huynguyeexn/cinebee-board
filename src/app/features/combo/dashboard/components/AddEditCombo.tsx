import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Spin, Form } from 'antd';
import comboApi from 'app/api/comboApi';
import { Combo } from 'app/interfaces/combo';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { InputField } from 'app/utils/components/FormFields';
import { stringToSlug } from 'app/utils/helper';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { comboActions, selectComboActionLoading } from '../../redux/comboSlice';

interface Props {
    onCancel: ()=>  void;
    isEdit?: boolean;
    data?: Combo;    
}

const formValidate = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    slug: yup.string().required(),
});

 
const AddEditCombo = ({ onCancel, isEdit = false, data}: Props) => {
    const dispatch = useAppDispatch();
    const saveLoading = useAppSelector(selectComboActionLoading);
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit, reset, setValue, getValues} = useForm<any>({
        resolver: yupResolver(formValidate),
    });

    // For edit
    React.useEffect(() => {
        if (isEdit) {
            if (!data || !data.id) return;
            setLoading(true);
            // get user and set form fields
            (async () => {
                const response: Combo = await comboApi.getById(data.id as string);
                Object.keys(response).forEach((key) => {
                    setValue(key, response[key as keyof Combo]);
                });
                setLoading(false);
            })();
        }
    }, [isEdit, data, setValue]);

    //convert to slug
    React.useEffect(() => {
        const name = getValues('name');
        if(name) {
            setValue('slug', stringToSlug(name));
        } else {
            setValue('slug', name);
        }
    });

    const onSubmit = (data: Combo) => {
        if (isEdit) {
            dispatch(comboActions.update(data));
        } else {
            dispatch(comboActions.create(data));
        }
    };

    return (
    <Spin spinning={loading}>
        <Form layout="vertical">
            <InputField control={control} name="name" label="Tên Combo" required />

            <InputField control={control} name="price" label="Giá" />

            <InputField control={control} name="slug" label="Url Web" />

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
                <Button style={{ float: 'left' }} type="primary">
                    <Link to="movies/new">
                        Thêm sản phẩm
                    </Link>
                </Button>
            </Col>
        </Form>
    </Spin>
    )
}

export default AddEditCombo;