import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/updateInput';
import classes from './updatePost.css';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';

class updatePost extends Component {

    state = {
        controls: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                defaultValue: '',
                ref: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            content: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    rows: "4",
                    placeholder: 'content'
                },
                defaultValue: '',
                ref: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        onSubmitValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls
        }

        const updatedFormElement = {
            ...updatedControls[inputIdentifier]
        }

        updatedFormElement.defaultValue = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.defaultValue, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedControls[inputIdentifier] = updatedFormElement;

        let formIsValid = true
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({ controls: updatedControls, formIsValid: formIsValid })
    }
    
    submitHandler = (event) => {
        event.preventDefault();
         this.props.updatePost(this.state.controls.title.defaultValue,  this.state.controls.content.defaultValue, this.props.post.id, this.props.token, this.props.userId);
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
                defaultValue: this.props.post[key],

            });
        }
      
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                defaultValue={formElement.defaultValue}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));
 
        if (this.props.loading) {
            form = <Spinner />
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
                    {form}
                    <Button btnType="Success" clicked={this.props.updateCancelled} disabled={!this.state.formIsValid}> Save Changes </Button>
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
        updatePost: (title, content, id, token, userId) => dispatch(actions.updatePost(title, content, id, token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(updatePost);
