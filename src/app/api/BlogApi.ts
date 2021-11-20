
import { ListParams, ListResponse } from './../interfaces/common';
import { Blog, SuccessResponse } from 'app/interfaces';
import axiosClient from './axiosClient';

const endpoint = '/blogs';

const BlogApi = {
    getListBlog(params?: ListParams): Promise<ListResponse<Blog>>{
        return axiosClient.get(endpoint,{params});
    },
    create(data: Blog): Promise<Blog> {
        return axiosClient.post(endpoint, data);
    },
    update(data: Blog): Promise<Blog> {
        const url = `${endpoint}/${data.id}`
        return axiosClient.put(url, data)
    },
    getById(id: string): Promise<Blog> {
		const url = `${endpoint}/${id}`;
		return axiosClient.get(url);
	},
    deleteById(params: Blog): Promise<SuccessResponse<Blog>> {
        const url = `${endpoint}/${params.id}/delete`;
        return axiosClient.delete(url)
    }
}


export default BlogApi;
