import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions/actionCreators';
import { connect } from 'react-redux';

const App = ({...props}) => {
  
  const {fetching, error, children } = props;
  return (
    <div>
      {fetching ? <h2>Loading...</h2> : 
        error ? <h2>{error}</h2> : children
      }
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps, actionCreators)(App)