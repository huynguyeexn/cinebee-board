import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import employeeRoleApi from 'app/api/employeeRole';
import { EmployeeRole } from 'app/interfaces'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import React from 'react'
import * as yup from 'yup';
import { employeeRoleActions, selectEmployeeRoleActionLoading } from '../../redux/employeeRoleSlice';
import { Button, Col, Spin, Form } from 'antd';
import { InputField } from 'app/utils/components/FormFields';

interface Props {
    onCancel: () => void;
    isEdit?:boolean;
    data?: EmployeeRole
}

const formValidate = yup.object().shape({
    name: yup.string().required()
})

export const AddEditEmployeeRole = ({onCancel, isEdit = false, data}: Props) => {
    const dispatch = useAppDispatch()
    const saveLoading = useAppSelector(selectEmployeeRoleActionLoading);
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit, reset, setValue } = useForm<any>({
        resolver: yupResolver(formValidate),
    });

    // For edit mode
    React.useEffect(() => {
        if(isEdit){
            if(!data){return}
            setLoading(true);
            // get user and set form fields
            (async () => {
                const response: EmployeeRole = await employeeRoleApi.getById(data);
                Object.keys(response).forEach((key) => {
                    setValue(key, response[key as keyof EmployeeRole])
                });
                setLoading(false);
            })();
        }
    },[isEdit, data, setValue])

    const onSubmit = (data: EmployeeRole) => {
        if(isEdit){
            dispatch(employeeRoleActions.update(data));
        }else{
            dispatch(employeeRoleActions.create(data));
        }
    }
    return (
            <Spin spinning={loading}>
                <Form layout="vertical">
                    <InputField control={control} name="name" label="Tên chức vụ" required />

                    {/* Form actions */}
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
                            style={{ margin: '0 8px' }}
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
