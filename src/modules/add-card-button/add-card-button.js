/* Dependencies import */
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './add-card-button.css';


import cardicon from '../../resources/images/Add_Card.svg';

class AddCardButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="add-card-button">
                <div className='add-card-button-section'>
                    <div className='add-card-icon-section'>
                        <img src={cardicon} className='addcard-icon' alt='addcard' />
                    </div>
                    <div className='add-card-label-section'>
                        <div className='addcard-label'>Add Card</div>
                    </div>
                </div>
            </div>
        );
    }
      


}

export default AddCardButton;