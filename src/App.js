import React, { Component } from 'react';
import { Route, Switch ,withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const asyncAddPost = asyncComponent(() => {
  return import('./containers/Posts/Posts')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout')
})

const asyncFullPost = asyncComponent(() => {
  return import('./containers/Posts/FullPost/FullPost')
})

const asyncPostList = asyncComponent(() => {
  return import('./containers/Posts/PostList/PostList')
})
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/new-post" component={asyncAddPost} />
            <Route path="/login" component={asyncAuth} />
            <Route path="/logout" component={asyncLogout} />
            <Route path="/posts/:id" component={asyncFullPost} />
            <Route path="/" exact component={asyncPostList} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(null, mapDispatchToProps)(App));
