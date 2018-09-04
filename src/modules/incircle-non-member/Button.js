import React, { PropTypes } from 'react';

export default class Button {
  static propTypes = {
    buttonText: PropTypes.string
  }

  render() {
    return (
      <button value={this.props.buttonText}></button>
    );
  }
}