/**
 * Created by viewar on 12/05/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export function withViewar(){
  return(WrappedComponent) => {
    return class Viewar extends Component {

      static contextTypes = {
        viewar: PropTypes.object.isRequired,
      }

      render(){
        const { viewar } = this.context;
        return <WrappedComponent { ...this.props} viewar={viewar} />;
      }
    };
  };
}