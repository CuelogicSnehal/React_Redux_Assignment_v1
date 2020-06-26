import React, { Component } from 'react';
import './FullPost.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import UpdatePost from '../updatePost/updatePost';
class FullPost extends Component {
     state ={
        updateModal : false
    }  

    componentDidMount() {
        this.props.getPostById(this.props.token, this.props.userId, this.props.match.params.id);
    }

    deletePostHandler = () => {
        this.props.deletePost(this.props.token, this.props.userId, this.props.match.params.id);
    }

    updatePostHandler = () => {
        this.setState({updateModal : true})
        this.props.updatePost(this.props.token, this.props.userId, this.props.match.params.id, { 'title': 'title' });
    }
    
    closeModalHandler = () => {
        this.setState({updateModal : false})
    }

    render() {
        let posts = this.props.posts.map(post => {
            return (
                <div className="FullPost">
                    <Modal show={this.state.updateModal} modalClosed={this.closeModalHandler} >
                        <UpdatePost postDetails={this.props.posts}/>
                     </Modal>
                    <h5>{post.title}</h5>
                    <p>{post.content}</p>
                    <div className="Edit">
                        <button onClick={this.updatePostHandler} className="Delete">Update</button>
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            )
        })
        return posts;
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        error: state.post.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPostById: (token, userId, postId) => dispatch(actions.getPostById(token, userId, postId)),
        deletePost: (token, userId, postId) => dispatch(actions.deletePost(token, userId, postId)),
        updatePost: (token, userId, postId, data) => dispatch(actions.updatePost(token, userId, postId, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);

