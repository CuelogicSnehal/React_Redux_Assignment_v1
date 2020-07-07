import React, { Component } from 'react';
import { Route, Switch ,withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import postRoute from './hoc/asyncComponent';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const addPost = postRoute(() => {
  return import('./containers/Posts/Posts')
})

const auth = postRoute(() => {
  return import('./containers/Auth/Auth')
})

const logout = postRoute(() => {
  return import('./containers/Auth/Logout/Logout')
})

const fullPost = postRoute(() => {
  return import('./containers/Posts/FullPost/FullPost')
})

const postList = postRoute(() => {
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
            <Route path="/new-post" component={addPost} />
            <Route path="/login" component={auth} />
            <Route path="/logout" component={logout} />
            <Route path="/posts/:id" component={fullPost} />
            <Route path="/" exact component={postList} />
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