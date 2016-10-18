import React, { Component, PropTypes } from 'react';
import * as actionCreators from '../actions/actionCreators';
import { connect } from 'react-redux';

class App extends Component {

  render(){
    const {fetching, error, children } = this.props;

    return (
        <div>
          {fetching ? <h2>Loading...</h2> : 
            error ? <h2>{error}</h2> : children
          }
        </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    fetching: state.fetching,
    error: state.error
  }
}

export default connect(mapStateToProps, actionCreators)(App)