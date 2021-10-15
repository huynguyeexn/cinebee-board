import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Spin, Col, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { Category } from 'app/interfaces/category';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { InputField, RadioGroupField } from 'app/utils/components/FormFields';
import React from 'react'
import * as yup from 'yup';
import { categoryActions, selectCategoryActionLoadding  } from '../../redux/categorySlice';
import categoryApi from 'app/api/category';
import { stringToSlug } from 'app/utils/helper';

interface Props {
    isEdit?: boolean;
    data?: Category;
    onCancel: () => void
}

const formValidate = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required(),
    show: yup.string().required(),
})

export const AddEditCategory = ({isEdit, data, onCancel}: Props) => {
    const dishpatch = useAppDispatch();
    const saveLoading = useAppSelector(selectCategoryActionLoadding);
    const [loading, setLoading] = React.useState(false);


    const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<any>({
        resolver: yupResolver(formValidate),
    })

    // For edit mode
    React.useEffect(() => {
        if(isEdit){
            if(!data) return;
            setLoading(true);
            (async () => {
                const response: Category = await categoryApi.getById(data);
                Object.keys(response).forEach((key) => {
                    setValue(key, response[key as keyof Category]);
                })
                setLoading(false);
            })();
        }
    }, [isEdit, data, setValue]);

    // Convert slug
    const watchname = watch("name");
    React.useEffect(() => {
        const name = getValues("name");
        if(name){
            setValue("slug", stringToSlug(name));
        }else{
            setValue("slug", name);
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchname, getValues])

    const onSubmit = (data: Category) => {
        if(isEdit){
            dishpatch(categoryActions.update(data));
        }else{
            dishpatch(categoryActions.create(data));
        }
    }
    return (
		<Spin spinning={loading}>
			<Form layout="vertical" initialValues={{ show: 1 }}>
				<InputField control={control} name="name" label="Thể loại bài viết" required />
				<InputField control={control} name="slug" label="Đường dẫn" required />
                <RadioGroupField
					control={control}
					label="Ẩn Hiện"
					name="show"
					options={[
						{
							label: 'Ẩn',
							value: 0,
						},
						{
							label: 'Hiện',
							value: 1,
						},
					]}
				/>
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
