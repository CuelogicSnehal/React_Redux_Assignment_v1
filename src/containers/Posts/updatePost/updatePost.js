import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './updatePost.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner'
class updatePost extends Component {

    inputChangedHandler = (event) => {
        console.log("[inputChangedHandler]", event.target)
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.updatePost(event.target.title.value, event.target.content.value, this.props.match.params.id, this.props.token, this.props.userId);
    }

    render() {
        let postDetails = this.props.postDetails
        var title, content

        postDetails.map(post => {
            title = post.title,
                content = post.content
        })

        let form1 = <form>
            <label>
                <input type="text"
                    name="title"
                    required
                    disabled
                    defaultValue={title}
                />
            </label> <br />
            <input type="text"
                name="content"
                required
                defaultValue={content}
                onChange={(event) => this.inputChangedHandler(event)} />

            <br />
        </form>

        if (this.props.loading) {
            form1 = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.NewPost}>
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {form1}
                    <Button btnType="Success">Update Post</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updatePost: (title, content, id, token, userId) => dispatch(actions.updatePost(title, content, id, token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(updatePost);
