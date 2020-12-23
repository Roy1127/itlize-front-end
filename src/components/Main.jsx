import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login  from './Login';
import Project from './Project';
import Resource from './Resource';
import { Register } from './Register';

export const Main = (props) => {

  const getLogin = () => {
    return props.authReducer.isAuthenticated ? <Redirect to="/resource" /> : <Login />;
  }

  const getResource = () => {
    return props.authReducer.isAuthenticated ? <Resource /> : <Redirect to="/login" />;
  }

  const getProject = () => {
    return props.authReducer.isAuthenticated ? <Project /> : <Redirect to="/login" />
  }

  return (
    <div className="Main">
      <Switch>
        <Route exact path="/" render={getLogin} />
        <Route path="/login" render={getLogin} />
        <Route path="/register" component={Register} />
        <Route path="/resource" render={getResource} />
        <Route path="/project" render={getProject} />
        <Route render={getLogin} />
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
