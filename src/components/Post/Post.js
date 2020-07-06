import React from 'react';
import {withRouter} from 'react-router-dom';
import './Post.css';
import { Card } from 'semantic-ui-react'

const post = (props) => {
    return (
        <Card.Group  onClick={props.clicked}>
        <Card fluid color='red' header={props.title} />
        <Card fluid color='orange' header={props.content} />
      </Card.Group>)
}
export default post;