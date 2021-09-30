import { Form, message, Modal, Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IMAGE_TYPE_ACCEPT } from 'app/constants';
import {
	selectImageUpload,
	selectUploadSuccess,
} from 'app/features/upload/redux/uploadSlice';
import { useAppSelector } from 'app/redux/hooks';
import { getBase64 } from 'app/utils/helper';
import React from 'react';
import { Control, useController } from 'react-hook-form';

interface Props {
	name: string;
	control: Control<any>;
	maxCount?: number;
	type?: 'image' | 'file';
	label?: string;
	required?: boolean;
	hasUpload: (list: any) => void;
}

export const UploadFileField = ({
	name,
	control,
	type = 'image',
	maxCount,
	label,
	required,
	hasUpload,
}: Props) => {
	// const dispatch = useAppDispatch();
	// const isUploading = useAppSelector(selectUploadLoading);
	const isUploadSuccess = useAppSelector(selectUploadSuccess);
	const images = useAppSelector(selectImageUpload);

	const [fileList, setFileList] = React.useState<UploadFile[]>();
	const [previewVisible, setPreviewVisible] = React.useState(false);
	const [previewFile, setPreviewFile] = React.useState<string>();

	const {
		field: { value, onChange },
	} = useController({
		name,
		control,
	});

	const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
		onChange(info.fileList);
		setFileList(info.fileList);
	};

	React.useEffect(() => {
		if (isUploadSuccess) {
			hasUpload(images);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUploadSuccess]);

	const handleBeforeUpload = (file: RcFile) => {
		if (type === 'image') {
			if (!IMAGE_TYPE_ACCEPT.includes(file.type)) {
				message.error(`${file.name} không phải là hình ảnh`);
				return Upload.LIST_IGNORE;
			}
		}
		return false;
	};

	const handlePreview = async (file: UploadFile<any>) => {
		if (!file.originFileObj) return;

		const filePreview: any = await getBase64(file.originFileObj);

		setPreviewFile(filePreview);
		setPreviewVisible(true);
	};

	const handleCancelPreview = () => {
		setPreviewFile(undefined);
		setPreviewVisible(false);
	};

	// const handleUpload = async () => {
	// 	if (!fileList) {
	// 		message.error(`Không có file để tải lên`);
	// 		return;
	// 	}

	// 	dispatch(uploadActions.uploadImages(fileList));
	// };

	return (
		<Form.Item name={name} label={label} required={required}>
			<Upload
				listType="picture-card"
				fileList={value}
				onChange={handleChange}
				beforeUpload={handleBeforeUpload}
				onPreview={handlePreview}
				maxCount={maxCount}
			>
				{fileList && fileList.length >= 8 ? null : (
					<div>
						<div style={{ marginTop: 8 }}>Chọn file</div>
					</div>
				)}
			</Upload>
			{/* <Button
				loading={isUploading}
				onClick={handleUpload}
				style={{ alignItems: 'center', display: 'flex' }}
			>
				{isUploading ? (
					<> Đang tải lên</>
				) : (
					<>
						<AiOutlineCloudUpload /> Tải lên
					</>
				)}
			</Button> */}
			<Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
				<img alt="example" style={{ width: '100%' }} src={previewFile} />
			</Modal>
		</Form.Item>
	);
};
