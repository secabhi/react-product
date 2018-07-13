import React, { Component } from 'react';
// import send from '../../../../resources/images/Send.svg';
import send from '../../../../resources/images/Send_SFF.svg';
import warning from '../../../../resources/images/Warning.svg'
import './option-seven.css';


export class DeliveryModal extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
    return (
        <div className="delivery-modal">
            <img className="delivery-modal-icon" src={send} alt="send" />
            <div className="delivery-modal-label">Would you like the system to select the fulfilling location?</div>
            <div className="delivery-modal-button-container">
                
                <div className="delivery-modal-button-no" 
                    onClick={this.props.closeModal}>NO
                </div> 
                
                <div className="delivery-modal-button-yes" 
                    onClick={this.props.navigate}>YES
                </div>
            </div>
        </div>
        )
    }
}

export class InvalidStoreModal extends Component {
    constructor(props) {
        super(props)
        
    }
    
    render() {
    return (
        <div className="invalid-store-modal">
            <img className="invalid-store-modal-icon" src={warning} alt="warning" />
            <div className="invalid-store-modal-label">Store Number doesn't match.</div>
            <div className="invalid-store-modal-button-container">
                <div className="invalid-store-modal-button" 
                    onClick={this.props.closeModal}>OK
                </div>
            </div>
        </div>
        )
    }
}

export default class InsufficientQnty extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
    return (
        <div className="insufficientQuntyModal">
            <img className="insufficientQuntyImage" src={send} alt="send" />
            <div className="Insufficient-quantities-override">Insufficient quantities. override?</div>
            <div  className="Code">1234-124-124-R4TY56U76U</div>
            <div  className="QTY">QTY<span className="QTYValue">1</span></div>
            <div  className="QtyPrice">PRICE<span className="PriceValue">120.00</span></div>
            <div className="insufficientQuntyButtons">
       
            <div className='insufficientQunty-modal-no-btn' onClick={this.props.closeModal}><span className='insufficientQunty-modal-no-btn-label'>NO</span>
                        </div>
                        <div className='insufficientQunty-modal-yes-btn'> <span className='insufficientQunty-modal-yes-btn-label'>YES</span>
                        </div>

                    </div>
        </div>
      
        )
    }
}
