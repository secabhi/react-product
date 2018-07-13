import React from 'react';
import './popup.css';

export default class Popup extends React.Component {
  render() 
  {
    return (
      <div className='verify-customer-popup'>
        <div className='flex-container verify-customer-popup-inner'>
          <div className="flex-popup-header verify-customer-popup-header">
            <div className="verify-customer-popup-title">{this.props.text}</div>
            <div className="verify-customer-popup-spacer"></div>
            <div onClick={this.props.closePopup}><img className="verify-customer-popup-close" src={require('../../resources/images/Cross_White.svg')} /></div>
          </div>
          <div className="flex-ng-popup-body">
            {this.props.children}
          </div>
          
        </div>
      </div>
    );
  }
}
  