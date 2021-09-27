import { Button, Form, message, Modal, Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import fileUploadApi from 'app/api/fileUploadApi';
import { IMAGE_TYPE_ACCEPT } from 'app/constants';
import { getBase64 } from 'app/utils/helper';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface Props {
	name: string;
	control: Control<any>;
	type?: 'image' | 'file';
	label?: string;
	required?: boolean;
}

export const UploadFileField = ({
	name,
	control,
	type = 'image',
	label,
	required,
}: Props) => {
	const {
		field: { onChange },
		// fieldState: { invalid, error },
	} = useController({
		name,
		control,
		defaultValue: undefined,
	});

	const url: string =
		(type === 'image' && process.env.REACT_APP_IMAGE_UPLOAD_URL) ||
		(type === 'file' && process.env.REACT_APP_FILE_UPLOAD_URL) ||
		'';
	const [isUploading, setIsUploading] = React.useState(false);

	const [fileList, setFileList] = React.useState<UploadFile[]>();
	const [previewVisible, setPreviewVisible] = React.useState(false);
	const [previewFile, setPreviewFile] = React.useState<string>();

	const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
		console.log(`handleChange`, info);
		onChange(info.fileList);
		setFileList(info.fileList);
	};

	const handleBeforeUpload = (file: RcFile) => {
		console.log(`handleBeforeUpload`, file);
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

	const handleUpload = async () => {
		if (!fileList) {
			message.error(`Không có file để tải lên`);
			return;
		}
		setIsUploading(true);

		try {
			await fileUploadApi.image(fileList);
			message.success(`Các tệp của bạn đã được tải lên`);
		} catch (error) {
			message.error(`Lỗi khi tải lên`);
		}
		setIsUploading(false);
	};

	return (
		<Form.Item name={name} label={label} required={required}>
			<Upload
				listType="picture-card"
				fileList={fileList}
				action={url}
				onChange={handleChange}
				beforeUpload={handleBeforeUpload}
				onPreview={handlePreview}
			>
				{fileList && fileList.length >= 8 ? null : (
					<div>
						<div style={{ marginTop: 8 }}>Chọn file</div>
					</div>
				)}
			</Upload>
			<Button
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
			</Button>
			<Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
				<img alt="example" style={{ width: '100%' }} src={previewFile} />
			</Modal>
		</Form.Item>
	);
};
