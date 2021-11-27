import React from 'react'
import { PageHeader, Spin, Row, Col} from 'antd';
import { Blog } from 'app/interfaces';
import BlogApi from 'app/api/BlogApi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectEmployeeMap, employeeActions } from 'app/features/employee/redux/employeeSlice';
import { useAppSelector } from 'app/redux/hooks';

import { Typography } from 'antd';

const { Title } = Typography;


interface Props {
 
}

const Viewblog = (props: Props) => {
   const [loading, setLoading] = React.useState(false);
   const dispatch = useDispatch();
   const { id } = useParams<{ id: string }>();
   const [BlogView,setBlogview] = React.useState<Blog>();
   const EmployeeMap = useAppSelector(selectEmployeeMap);
   React.useEffect(() => {
        setLoading(true);
        (async () => {
            let response: Blog = await BlogApi.getById(id);
            setBlogview(response);
            setLoading(false);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [id]);
    // Người đăng
    React.useEffect(() => {
        dispatch(employeeActions.getAll());
    }, [dispatch]);
   return (
        <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={Object.keys(EmployeeMap).length !== 0 ? (
            <>Bài viết của {EmployeeMap[`${BlogView?.employee_id}`]?.fullname}</>
        ) :""}
    >
        <Spin spinning={loading}>
        {!loading && (
            <Row justify="center" style={{ marginTop:"20px" }}>
                <Col span={12}>
                    <Title level={1} style={{ margin:"20px 20px", textAlign:"center" }}>{BlogView?.title}</Title>
                    <Col span={24} dangerouslySetInnerHTML={{__html: `${BlogView?.content}` }}>
                    </Col>
                </Col>
            </Row>
        )}
        </Spin>
    </PageHeader>
    )
}

export default Viewblog;