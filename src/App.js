import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/Posts';
import PostList from './containers/Posts/PostList/PostList';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import  FullPost from  './containers/Posts/FullPost/FullPost';
class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/new-post" component={Posts} />
            <Route path="/login" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route  path="/posts/:id" component={FullPost} />
            <Route path="/" exact component={PostList} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
