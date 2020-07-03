import React from 'react';
import {withRouter} from 'react-router-dom';
import './Post.css';
import { Card } from 'semantic-ui-react'

const post = (props) => {
    return (
        <Card.Group  onClick={props.clicked}>
        <Card fluid color='red' header={props.title} />
        <Card fluid color='orange' header={props.content} />
      </Card.Group>
    //     <article className="Post" onClick={props.clicked}>
    //     <h1>{props.title}</h1>
    //     <div className="Info">
    //         <div className="Content">{props.content}</div>
    //     </div>
    // </article>
    )
}
export default post;