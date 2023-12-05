import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPost = createAsyncThunk('posts/fetchPost', async ()=>{
    const {data} = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async ()=>{
    const {data} = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id)=>{
    await axios.delete(`/posts/${id}`)
    return id
})

const initialState = {
    posts: {
        items:[],
        status:'loading'
    },
    tags: {
        items:[],
        status:'loading'
    },
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        addNewPost: (state, action)=>{
            state.posts.items.push(action.payload)
        },
        updatePost: (state, action)=>{
            console.log(action.payload)

            const index = state.posts.items.findIndex(elem => elem._id === action.payload._id)
            state.posts.items[index] = action.payload
        }
    },
    extraReducers:{
        [fetchPost.pending]: (state)=>{
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPost.fulfilled]: (state,action)=>{
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPost.rejected]: (state)=>{
            state.posts.items = []
            state.posts.status = 'error'
        },
        [fetchTags.pending]: (state)=>{
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state,action)=>{
            const uniqueTags = [...new Set(action.payload)];
            state.tags.items = uniqueTags
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state,)=>{
            state.tags.items = []
            state.tags.status = 'error'
        },
        [fetchRemovePost.fulfilled]: (state,action)=>{
            // state.posts.items = state.posts.items.filter(elem => elem._id !== action.payload)
            state.posts.items = state.posts.items.filter(elem => elem._id !== action.meta.arg)
        }
    }
})

export const postsReducer = postsSlice.reducer
export const actionsPosts = postsSlice.actions