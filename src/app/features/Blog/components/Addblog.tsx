import React,{useRef} from 'react'
import { getCurrentUser } from 'app/utils/Account';
import { PageHeader, Spin, Row, Col, Form, Button} from 'antd';
import { UploadFileField, InputField, SelectField, RadioGroupField } from 'app/utils/components/FormFields';
import { ImageUpload, Blog } from 'app/interfaces';
import fileUploadApi from 'app/api/fileUploadApi';
import { UploadFile } from 'antd/lib/upload/interface';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { categoryActions, selectCategoryOptions} from 'app/features/category/redux/categorySlice';
import { useAppSelector } from 'app/redux/hooks';
import { useDispatch } from 'react-redux';
import { BlogAction } from '../redux/BlogSlide';
import { stringToSlug } from 'app/utils/helper';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogApi from 'app/api/BlogApi';



interface Props {
 
}
const formValidate = yup.object().shape({
    background_rq: yup.mixed().required('Bạn chưa chọn hình'),
    title: yup.string().required("Bạn chưa nhập tiêu đề"),
    category_id: yup.number().required("Bạn chưa chọn thể loại"),
    summary: yup.string().required('Bạn chưa nhập tóm tắt'),
    show: yup.number().required("Bạn chưa chọn"),
    slug: yup.string().required('Bạn chưa điền đường dẫn blog'),
})
const cloudName = 'newdsa';
const unsignedUploadPreset = 'v84r8j5n';
const Addblog = (props: Props) => {
    const id = getCurrentUser()?.id;
    const dispatch = useDispatch();
    const { id_blog } = useParams<{ id_blog: string }>();
    const [contentCK, setcontentCK] = React.useState<any>();
	const isEdit = Boolean(id_blog);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [backgroud, setbackgroud] = React.useState<ImageUpload[]>();
    const editorRef = useRef<any>(null);
    const [loading, setLoading] = React.useState(false);
    const typeOptions = useAppSelector(selectCategoryOptions);
    const [initValues, setInitValues] = React.useState<Blog>();
    const { control, handleSubmit,setValue, watch, getValues,reset } = useForm<any>({
        resolver: yupResolver(formValidate),
        defaultValues: React.useMemo(() => initValues, [initValues]),
    });
    const watchtitle = watch('title');
	const watchSlug = watch('slug');
	React.useEffect(() => {
		const title = getValues('title');
		if (title) {
			setValue('slug', stringToSlug(title));
		} else {
			setValue('slug', title);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchtitle, getValues]);

	React.useEffect(() => {
		const slug = getValues('slug');
		if (slug) {
			setValue('slug', stringToSlug(slug));
		} else {
			setValue('slug', slug);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchSlug, getValues]);

    React.useEffect(() => {
        dispatch(categoryActions.getAll());
    }, [dispatch]);


    React.useEffect(() => {
		if (isEdit) {
			setLoading(true);
			(async () => {
				let response: Blog = await BlogApi.getById(id_blog);
				setbackgroud(response.background || []);
                setcontentCK(response.content);
                setInitValues(response);
				// Set form fields
				reset(response);
				setLoading(false);
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit,setValue, id_blog]);
    console.log(backgroud);
    const onSubmit = async (data: Blog) => {
        const backgroudUL = await handleUpload(data);
        data.content = editorRef.current.getContent();
        data.employee_id = id as number;
        const newData = {
			...data,
			background_rq: (backgroudUL?.map((bg) => bg.id) as number[]) || data.background_rq,
		};
        if(isEdit){
            dispatch(BlogAction.update(newData));
        }else{
            dispatch(BlogAction.create(newData));
        }
    }
    
    const handleUpload = async (data: Blog): Promise<ImageUpload[]> => {
		// Filter image not uploaded
		let background_rq: Array<any> = data.background_rq;
		background_rq = background_rq.filter((image) => typeof image === 'object' && Boolean(image.uid));

		const response: { data: ImageUpload[] } = await fileUploadApi.image(
			background_rq as UploadFile<any>[]
		);
		return response.data;
	};
    return (
        <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={'Viết bài'}
    >
        <Spin spinning={loading}>
        {!loading && (
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form layout="vertical" initialValues={{ show: 1 }}>
                           <Col span={24}>
                           <SelectField
                                control={control}
                                name="category_id"
                                label="Thể loại"
                                options={typeOptions}
                                required/>
                            </Col>
                            <Col span={24}>
                                <InputField control={control} name="title" label="Tiêu đề" required />
                                <InputField name="slug" label="Đường dẫn bài viết" control={control} required />
                                <InputField name="summary" label="Tóm tắt" control={control} rows={4} required />
                            </Col>
                            <Col span={24}>
                            <UploadFileField
                                name="background_rq"
                                required
                                label="Ảnh nền"
                                hasUpload={handleUpload}
                                data={backgroud}
                                control={control}
                                maxCount={1}
                            />

                            </Col>
                        <RadioGroupField
                            control={control}
                            label="Trạng thái"
                            name="show"
                            options={[
                                {
                                    label: 'Ẩn',
                                    value: 0,
                                },
                                {
                                    label: 'Hiện',
                                    value: 1,
                                }
                            ]}
                            required />
                            <Col span={24}>
                            <Editor
                            
                              apiKey={"2jisg4s7ks9iar25od1edbeq3kc3it2k4ekdqhywrvakkiqe"}
                              onInit={(evt, editor: any) => editorRef.current = editor}
                              initialValue={contentCK}
                                init={{
                                height: 600,
                                menubar: false,
                                config: {},
                                language: "vi_VN",
                                language_url: '/langs/vi_VN.js',
                                // skin: 'oxide-dark',
                                // content_css: 'dark',
                                images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload `,
                                images_upload_credentials: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                    `undo redo| link code image | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help`,
                                    // image_title: true,
                                    automatic_uploads: true,
                                    image_description: false,
                                    file_picker_types: 'image',
                                    file_browser_callback_types: 'image',
                                    images_upload_handler: function (blobInfo, success, failure) {
                                        // file.append('');
                                        // console.log(blobInfo.blob());
                                        // const blob = blobInfo.blob();
                                        // success("data:" + blob.type + ";base64," + blobInfo.base64());
                                        let data = new FormData();
                                        var reader = new FileReader();
                                        // var file = this.files[0];
                                        var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                                        data.append('file', blobInfo.blob(), blobInfo.filename());
                                        data.append('upload_preset', unsignedUploadPreset);
                                        data.append('tags', 'browser_upload');
                                        axios.post(url, data)
                                          .then(function (res) {
                                            success(res.data.secure_url)
                                          })
                                          .catch(function (err) {
                                            console.log(err)
                                          });
                                        reader.readAsDataURL(blobInfo.blob())
                                    },
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                }}
                            />
                            </Col>
                            {/* Form actions */}
                            <Col span={24} style={{ textAlign: 'right', marginTop: "20px" }}>
                                <Button style={{ margin: '0 8px' }} 
                                // onClick={() => reset()} 
                                type="link">
                                    Clear
                                </Button>
                                <Button
                                    // onClick={() => {
                                    //     reset();
                                    // }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    // loading={loading || isSaving}
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
    )
}

export default Addblog;
