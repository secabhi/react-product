import React, { Component } from 'react';
import './modal-two.css';

export default class ModalTwo extends Component {
  constructor(props){
    super(props)
  }

  render() {
    if(this.props.overlay) {
      return(
        <div className="modal-frame">
          <div className="model-content" style={this.props.style}>
            {this.props.children}
          </div>
        </div>
      )
    }
    
    return (
      <div className="model-content-absolute" style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
};
