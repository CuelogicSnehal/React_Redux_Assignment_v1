import axios from 'axios';
import * as actionTypes from './actionTypes';
import HttpsProxyAgent from 'https-proxy-agent';
var agent = new HttpsProxyAgent("http://localhost:3000");

export const postStart = () => {
    return {
        type: actionTypes.POST_START
    };
};

export const postSuccess = (post) => {
    return {
        type: actionTypes.ADD_POST,
        post: post,
    };
};

export const fetchPostFailed = (error) => {
    return {
        type: actionTypes.FETCH_POST_FAILED,
        error: error
    };
};

export const post = (title, content, token, userId) => {
    return dispatch => {
        dispatch(postStart());
        const data = {
            title: title,
            content: content,
            userId: userId
        }
        axios.post('https://assignment-87476.firebaseio.com/posts.json?auth=' + token, data, {
            httpAgent: agent
        }).then(response => {
            dispatch(postSuccess(response.data))
        }).catch(err => {
            dispatch(fetchPostFailed(err))
        })
    };
};

export const fetchPostList = (posts) => {
    return {
        type: actionTypes.FETCH_POST,
        posts: posts
    };
};

export const fetchPostStart = () => {
    return {
        type: actionTypes.FETCH_POST_START
    };
};

export const getPosts = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://assignment-87476.firebaseio.com/posts.json' + queryParams, {
            httpAgent: agent
        }).then(response => {
            let posts = []
            for (let key in response.data) {
                posts.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchPostList(posts));
        }).catch(error => {
            dispatch(fetchPostFailed(error))
        });
    };
};

export const fetchPostById = (res, id) => {
    res.id = id
    return {
        type: actionTypes.FETCH_POST_BY_ID,
        post: res
    };
};

export const getPostById = (token, userId, postId) => {
    return dispatch => {
        const queryParams = '?auth=' + token;
        axios.get(`https://assignment-87476.firebaseio.com/posts/${postId}.json` + queryParams,
        ).then(response => {
            dispatch(fetchPostById(response.data, postId));
        }).catch(error => {
            dispatch(fetchPostFailed(error))
        });
    };
}

export const deletePostSuccess = (postId) => {
    return {
        type: actionTypes.DELETE_POST,
        postId: postId
    };
};

export const deletePost = (token, userId, postId) => {
    return dispatch => {
        const queryParams = '?auth=' + token;
        fetch(`https://assignment-87476.firebaseio.com/posts/${postId}.json` + queryParams, {
            method: 'DELETE'
        }).then(response => {
            dispatch(deletePostSuccess(postId));
        }).catch(error => {
            dispatch(fetchPostFailed(error))
        });
    };
}

export const updatePostSuccess = (posts, id) => {
    return {
        type: actionTypes.UPDATE_POST,
        posts: posts,
        id: id
    };
};

export const updatePost = (title, content, id, token, userId) => {
    return dispatch => {
        const data = {
            title: title,
            content: content,
            userId: userId
        }
        const queryParams = '?auth=' + token;
        axios.put(`https://assignment-87476.firebaseio.com/posts/${id}.json` + queryParams, data).then(response => {
            dispatch(updatePostSuccess(data, id));
        }).catch(error => {
            dispatch(fetchPostFailed(error))
        });
    };
}
