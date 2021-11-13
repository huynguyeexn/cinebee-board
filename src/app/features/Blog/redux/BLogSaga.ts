
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse } from './../../../interfaces/common';
import BlogApi from 'app/api/BlogApi';
import { Blog, SuccessResponse } from 'app/interfaces';
import { put, takeLatest, call, select } from '@redux-saga/core/effects';
import { BlogAction } from './BlogSlide';
import { debounce } from '@redux-saga/core/effects';

function* GetListBlog(actions: PayloadAction<ListParams>){
    try {
        const data: ListResponse<Blog> = yield call(BlogApi.getListBlog,actions.payload);
        yield put(BlogAction.ListBlogSS(data));
    } catch (error) {
        yield put(BlogAction.runError());
    }
}

function* create(actions: PayloadAction<Blog>){
    try {
        const data: SuccessResponse<Blog> = yield call(BlogApi.create,actions.payload);
        const filter: ListParams = yield select((state) => state.blog.filter);
        yield put(BlogAction.runSuccess(data));
        yield put(BlogAction.ListBlog(filter));
    } catch (error) {
        yield put(BlogAction.runError());
    }
}
function* update(actions: PayloadAction<Blog>){
    try {
        const data: SuccessResponse<Blog> = yield call(BlogApi.update,actions.payload);
        const filter: ListParams = yield select((state) => state.blog.filter);
        yield put(BlogAction.runSuccess(data));
        yield put(BlogAction.ListBlog(filter));
    } catch (error) {
        yield put(BlogAction.runError());
    }
}

function* deleteById(actions: PayloadAction<Blog>){
      try {
        const data: SuccessResponse<Blog> = yield call(BlogApi.deleteById,actions.payload);
        const filter: ListParams = yield select((state) => state.blog.filter);
        yield put(BlogAction.runSuccess(data));
        yield put(BlogAction.ListBlog(filter));
      } catch (error) {
        yield put(BlogAction.runError());
      }
}
function* setFilterDebounce (actions: PayloadAction<ListParams>) {
    yield put(BlogAction.setFilter(actions.payload));
}

export default function* BlogSaga(){
    yield takeLatest(BlogAction.ListBlog,GetListBlog);
    yield takeLatest(BlogAction.create,create);
    yield takeLatest(BlogAction.update, update);
    yield takeLatest(BlogAction.delete, deleteById);
    yield debounce(1000, BlogAction.setFilterDebounce, setFilterDebounce);
}