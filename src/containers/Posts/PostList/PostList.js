
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import './PostList.css';
import { Grid, Segment } from 'semantic-ui-react'

class PostList extends Component {

    componentDidMount() {
        this.props.getPost(this.props.token, this.props.userId);
    }

    postSelectedHandler = (post_id) => {
        this.props.history.push('/posts/' + post_id);
    }

    render() {
        return (<div>
            {this.props.posts.map((post) => (
                <div key={post.id} onClick={() => this.postSelectedHandler(post.id)}>
                    <Grid columns={3} divided>
                        <Grid.Row stretched>
                            <Grid.Column>
                                <Segment>{post.title}</Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
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
