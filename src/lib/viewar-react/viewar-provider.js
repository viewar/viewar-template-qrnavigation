/**
 * Created by viewar on 12/05/2017.
 */
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';


export class ViewarProvider extends Component {
    getChildContext() {
      return { viewar: this.viewar };
    }
    constructor(props, context) {
      super(props, context)
      this.viewar = props.viewar;
    }
    render(){
       return Children.only(this.props.children);
    }
}

ViewarProvider.propTypes = {
  viewar: PropTypes.object.isRequired,
}

ViewarProvider.childContextTypes = {
  viewar: PropTypes.object.isRequired,
}
