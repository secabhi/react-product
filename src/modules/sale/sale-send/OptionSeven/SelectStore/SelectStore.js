import React, { Component } from 'react';
import { InvalidStoreModal } from '../OptionSevenModals';
import Modal from 'react-responsive-modal';
import {TextField} from 'material-ui';
import './select-store.css';
import '../option-seven.css';



export default class SelectStore extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storeNumber : '',
            associatePin: '',
            invalid_modal: false
        }
    }



    render() {

        const textFieldInputStyle = {
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '30px': '56px',
            lineHeight: '1.19',
            fontWeight: '400',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
        }

        return (
            
            <div className="select-store-container">
                <Modal classNames={{modal: "invalid-store-modal"}} 
                    open={this.state.invalid_modal} 
                    onClose={() => this.setState({invalid_modal: false})} 
                    closeOnOverlayClick={false}
                    onClick={()=> this.renderInvalidModal()}
                    >
                </Modal>

                <div className="select-store-text">From Store</div>

                <div className="select-store-content">
                <div className="select-store-form">
                    <label className="store-form-label">Sending Store Number</label>
                        <TextField className="store-textfield"
                            type="number"
                            // value={this.state.storeNumber}
                            hintText="Store Number"                    
                            // style = {textFieldStyle}
                            inputStyle = {textFieldInputStyle}
                            refs="select-store-form" 
                            required
                        />

                    <label className="store-form-label associate-pin-label">Sending Associate PIN</label>
                        <TextField className="store-textfield"
                            type="number"
                            // value={this.state.associatePin}
                            hintText="Associate Pin"                    
                            // style = {textFieldStyle}
                            inputStyle = {textFieldInputStyle}
                            refs="select-store-form" 
                            required
                        />
                </div>
                </div>

            </div>
            )
        }

        // renderInvalidModal = () => {
        //     if(this.state.storeNumber is invalid) {
        //         this.setState({
        //             invalid_modal: true
        //         })
        //     }
        // }
};
