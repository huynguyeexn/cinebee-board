
import React from 'react';
import { Row, Button, Col} from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';
import ListBlog from './../components/ListBlog';
import { Link } from 'react-router-dom';
import { FilterBLog } from './../components/FilterBlog';


const BlogDashboard = () => {
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
				<ListBlog />
			</Col>
			
		</Row>
    );
}

export default BlogDashboard;


