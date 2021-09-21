import React from 'react';
import { Modal } from 'antd';
import { AiOutlineWarning } from 'react-icons/ai';

const { confirm } = Modal;

interface Props {}

const DeleteModal = (props: Props) => {
	confirm({
		title: 'Are you sure delete this task?',
		icon: <AiOutlineWarning />,
		content: 'Some descriptions',
		okText: 'Yes',
		okType: 'danger',
		cancelText: 'No',
		onOk() {
			console.log('OK');
		},
		onCancel() {
			console.log('Cancel');
		},
	});
};

export default DeleteModal;
