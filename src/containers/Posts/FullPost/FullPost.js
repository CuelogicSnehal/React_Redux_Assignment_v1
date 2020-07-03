import React, { Component } from 'react';
import './FullPost.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import UpdatePost from '../updatePost/updatePost';
import { Button, Card } from 'semantic-ui-react'

class FullPost extends Component {
    state = {
        updateModal: false
    }

    componentDidMount() {
        this.props.getPostById(this.props.token, this.props.userId, this.props.match.params.id);
    }

    deletePostHandler = () => {
        this.props.deletePost(this.props.token, this.props.userId, this.props.match.params.id);
    }

    updatePostHandler = () => {
        this.setState({ updateModal: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ updateModal: false });
    }

    closeModalHandler = () => {
        this.setState({ updateModal: false })
    }

    render() {
        let posts = this.props.posts.map(post => {
            return (
                <div>
                    <Modal show={this.state.updateModal} modalClosed={this.closeModalHandler} >
                        <UpdatePost post={post} purchaseCancelled={this.purchaseCancelHandler} />
                    </Modal>
                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>{post.title}</Card.Header>
                                <Card.Description>
                                    {post.content}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <button onClick={this.updatePostHandler} className="Delete">Update</button>
                                    <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Card.Group>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);