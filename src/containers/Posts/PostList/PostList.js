
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import './PostList.css';
import { Table } from 'semantic-ui-react';

class PostList extends Component {
    state = {
        fullpost: false,
        post_id: null
    }

    componentDidMount() {
        this.props.getPost(this.props.token, this.props.userId);
    }

    postSelectedHandler = (post_id, post) => {
        this.setState({ fullpost: true, post_id: post_id });
        this.props.history.push('/posts/' + post_id);
    }

    render() {
        let posts
        Array.isArray(this.props.posts) ? posts = this.props.posts : posts = [this.props.posts];
        return (<div>
            {posts.map((post) => (
                <div key={post.id} onClick={() => this.postSelectedHandler(post.id, post)}>
                    <Table color='black' key='black'>
                        <Table.Body colSpan='1' >
                            <Table.Row  >
                                <Table.Cell rowSpan='3'>{post.title}</Table.Cell>   
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            ))}
        </div>)
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
        getPost: (token, userId) => dispatch(actions.getPosts(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
