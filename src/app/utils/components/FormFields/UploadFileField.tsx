import { Form, message, Modal, Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IMAGE_TYPE_ACCEPT } from 'app/constants';
import {
	selectImageUpload,
	selectUploadSuccess,
} from 'app/features/upload/redux/uploadSlice';
import { ImageUpload } from 'app/interfaces';
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
	data?: ImageUpload[];
}

export const UploadFileField = ({
	name,
	control,
	type = 'image',
	maxCount,
	label,
	data,
	required,
	hasUpload,
}: Props) => {
	const isUploadSuccess = useAppSelector(selectUploadSuccess);
	const images = useAppSelector(selectImageUpload);

	const [fileList, setFileList] = React.useState<UploadFile[]>(
		(data as UploadFile[]) || []
	);
	const [previewVisible, setPreviewVisible] = React.useState(false);
	const [previewFile, setPreviewFile] = React.useState<string>();

	const {
		field: { onChange },
		fieldState: { invalid, error },
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

	const handlePreview = async (file: any) => {
		let filePreview: any = '';
		if (!file.url) {
			filePreview = await getBase64(file.originFileObj);
		}

		setPreviewFile(file.url || filePreview);
		setPreviewVisible(true);
	};

	const handleCancelPreview = () => {
		setPreviewFile(undefined);
		setPreviewVisible(false);
	};

	return (
		<Form.Item
			name={name}
			label={label}
			required={required}
			help={error?.message}
			validateStatus={invalid ? 'error' : ''}
		>
			<Upload
				listType="picture-card"
				fileList={fileList}
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
			<Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
				<img alt="example" style={{ width: '100%' }} src={previewFile} />
			</Modal>
		</Form.Item>
	);
};
