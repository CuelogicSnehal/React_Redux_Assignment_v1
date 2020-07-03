import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './updatePost.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner'

class updatePost extends Component {

    submitHandler = (event) => {
        event.preventDefault();
        this.props.updatePost(this.getTitleInput.value, this.getContentInput.value, this.props.post.id, this.props.token, this.props.userId);
    }

    render() {
        let form1 = <form>
            <input type="text"
                name="title"
                required
                ref={(input) => this.getTitleInput = input} defaultValue={this.props.post.title}
            />
            <br />
            <input type="text"
                name="content"
                required
                ref={(input) => this.getContentInput = input} defaultValue={this.props.post.content}
            />
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
                <form onSubmit={this.submitHandler} >
                    {errorMessage}
                    {form1}
                    <Button btnType="Success" clicked={this.props.purchaseCancelled}>Update Post</Button>
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
