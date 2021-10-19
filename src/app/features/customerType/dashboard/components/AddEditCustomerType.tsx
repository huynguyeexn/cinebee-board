import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Spin, Form} from 'antd';
import customerTypeApi from 'app/api/customerType';
import { CustomerType } from 'app/interfaces'
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { InputField } from 'app/utils/components/FormFields';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { customerTypeActions, selectCustomerTypeActionLoading } from '../../redux/customerTypeSlice';

interface Props {
    onCancel: () => void;
    isEdit?: boolean;
    data?: CustomerType
}

const formValidate = yup.object().shape({
    name: yup.string().required()
})

export const AddEditCustomerType = ({onCancel, isEdit = false, data}: Props) => {
    const dispatch = useAppDispatch();
    const saveLoading = useAppSelector(selectCustomerTypeActionLoading);
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit, reset, setValue } = useForm<any>({
		resolver: yupResolver(formValidate),
	});

    React.useEffect(()=>{
        if(isEdit){
            if(!data) return;
            setLoading(true);
            (async () => {
                const response: CustomerType = await customerTypeApi.getById(data);
                Object.keys(response).forEach((key) => {
                    setValue(key, response[key as keyof CustomerType])
                });
                setLoading(false)
            })();
        }
    },[isEdit, data, setValue])

    const onSubmit = (data: CustomerType) => {
		if (isEdit) {
			dispatch(customerTypeActions.update(data));
		} else {
			dispatch(customerTypeActions.create(data));
		}
	};

    return (
        <Spin spinning={loading}>
			<Form layout="vertical">
				<InputField control={control} name="name" label="Hạng" required />

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
