
import React from 'react';
import { Row, Button, Col, Modal } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import ListBlog from './../components/ListBlog';
import { Link } from 'react-router-dom';
import { FilterBLog } from './../components/FilterBlog';
import { Blog } from 'app/interfaces';


const BlogDashboard = () => {
	const [visible, setVisible] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
	const [Blog,setBlog] = React.useState({});
	const showModal = (blog: Blog) => {
		setVisible(true);
		console.log(blog);
	};
	
    return (
    
            <Row gutter={[16, 16]}>
			<Col span={24}>
				<Link to='/admin/blog/add'>
				<Button
					icon={<AiOutlinePlus />}
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
					// onClick={handleAddButtonClick}
				  >
					Viết bài
				</Button>
				</Link>
			</Col>
			<Col span={24}>
				<FilterBLog />
			</Col>
			<Col span={24}>
				<ListBlog showModal={showModal} />
			</Col>
			<Modal
				title="Title"
				visible={visible}
				footer={null}
				destroyOnClose={true}
			>
				<p>{modalText}</p>
			</Modal>
		</Row>
    );
}

export default BlogDashboard;


