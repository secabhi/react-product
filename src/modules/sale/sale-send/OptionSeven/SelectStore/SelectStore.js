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
            storeDetails : {
                storeNumber : '',
                associatePin: ''
            },
            invalid_modal: false
        }
        this.state.storeDetails = this.props.optionSevenObject;
    }



    render() {
        console.log('select store props', this.props)
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
                            value={this.state.storeDetails.storeNumber}
                            onChange={(e) => {
                                this.setStoreNumber(e);
                            }}
                            hintText="Store Number"                    
                            // style = {textFieldStyle}
                            inputStyle = {textFieldInputStyle}
                            refs="select-store-form" 
                            required
                        />

                    <label className="store-form-label associate-pin-label">Sending Associate PIN</label>
                        <TextField className="store-textfield"
                            type="number"
                            value={this.state.storeDetails.associatePin}
                            onChange={(e) => {
                                this.setAssociatePin(e);
                            }}
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

        setStoreNumber = (e) => {
            // Retrieves the store number
            let selectedStoreNumber = e.target.value;
            this.setState({
                storeDetails: {
                    ...this.state.storeDetails,
                    storeNumber: selectedStoreNumber
                }
            })
        }

        setAssociatePin = (e) => {
            // Retrieves the associate pin
            let selectedAssocaitePin = e.target.value;
            this.setState({
                storeDetails: {
                    ...this.state.storeDetails,
                    associatePin: selectedAssocaitePin
                }
            })
        }

        // renderInvalidModal = () => {
        //     FUNCTION TO CHECK FOR A VALID STORE NUMBER
        //     if(this.state.storeNumber != valid store num) {
        //         this.setState({
        //             invalid_modal: true
        //         })
        //     }
        // }
        
}; // END CLASS
