import React from 'react';
import './popup.css';


export default class Popup extends React.Component {
  render() 
  {
    return (
      <div className='verify-sale-customer-popup-sff'>
        <div className='flex-sale-container verify-sale-customer-popup-inner'>
          <div className="flex-sale-popup-header verify-sale-customer-popup-header">
            <div className="verify-sale-customer-popup-title">{this.props.text}</div>
            <div className="verify-sale-customer-popup-spacer"></div>
            <div onClick={this.props.closePopup}><img className="verify-sale-customer-popup-close" src={require('../../../resources/images/Cross_White.svg')} /></div>
          </div>
          <div className="flex-sale-ng-popup-body">
            {this.props.children}
          </div>
          
        </div>
      </div>
    );
  }
}
  