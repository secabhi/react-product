
import React from 'react';
import './modal.css';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state={x: 1025, y: 450};
  }

changeSize(x,y) {
  this.setState({x,y});
}

  render() {
    return <div className="frame" styles={{width: this.state.x, height: this.state.y}} >{this.props.children}</div>
  }
}

export default Modal;
