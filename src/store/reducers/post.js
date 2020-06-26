import * as actionTypes from '../actions/actionTypes'
import { post } from '../actions'

const initialState = {
    posts: [],
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_POST:
            return {
                ...state
            }

        case actionTypes.FETCH_POST_START:
            return {
                ...state
            }

        case actionTypes.FETCH_POST:
            return {
                ...state,
                posts: action.posts
            }

        case actionTypes.FETCH_POST_FAILED:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.FETCH_POST_BY_ID:
            return{
                ...state,
                posts: state.posts.filter(post => post.id == action.post)
            }

        case actionTypes.FETCH_POST_BY_ID_FAILED:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.DELETE_POST:
            {
                const newState = Object.assign([], state);
                const delPost = state.posts.findIndex(post => {
                    return post.id == action.postId
                })
                newState.splice(delPost, 1);
                return newState;
            }
        case actionTypes.UPDATE_POST:
            return [
            ...state.filter(post => post.id !== action.postId ),
            Object.assign({}, action.postId)
          ]

        default: return state
    }
}

export default reducer;