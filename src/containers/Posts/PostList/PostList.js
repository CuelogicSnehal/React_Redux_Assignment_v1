
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import './PostList.css';
import Post from '../../../components/Post/Post'

class PostList extends Component {

    componentDidMount() {
        this.props.getPost(this.props.token ,this.props.userId);
    }

    postSelectedHandler = (post_id) => {
        this.props.history.push('/posts/' + post_id);
    }

    render() {
       let posts = this.props.posts.map(post => {
           console.log("post", post)
                return <Post 
                key={post.id} 
                title={post.title} 
                clicked={() => this.postSelectedHandler(post.id)} />;
            })
        return (
            <div className="PostList">
                <section  className="PostList" >
                    {posts}
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        error: state.post.error,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: (token,userId) => dispatch(actions.getPosts(token,userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

