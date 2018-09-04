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
            
            invalid_modal: false
        }
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
            marginTop:'2px'
        }
        const  textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: '30px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            lineHeight: '1.21',
            textAlign: 'left',
            color: '#333333'
        }
        const  textFieldStyle = {
            height: '60px',
            paddingTop: '30px',
            color: '#828282'
        }
        const underlineStyle = {
            backgroundColor: '#828282'
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
                <form className="select-store-form">
                  
                        <TextField className="store-textfield storeNum"
                            type="number"
                            floatingLabelText="Sending Store Number - For SKU #7:2028-650-401024723603 543365"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            style={textFieldStyle}
                            fullWidth={true}  
                            value={this.props.StoreNumber}
                            onChange={(e) => {
                                this.props.setStoreNumber(e);
                            }}
                            underlineStyle={underlineStyle}
                            inputStyle = {textFieldInputStyle}
                            refs="select-store-form" 
                            required
                        />

                    
                        <TextField className="store-textfield store-form-label associate-pin-label associateNum"
                            type="number"
                            floatingLabelText="Sending Associate PIN - For store 1"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            style={textFieldStyle}
                            fullWidth={true}
                            value={this.props.AssociatePin}
                            onChange={(e) => {
                                this.props.setAssociatePin(e);
                            }}
                            inputStyle = {textFieldInputStyle}
                            underlineStyle={underlineStyle}
                            refs="select-store-form" 
                            required
                        />
                       
                        <TextField className="store-form-label associate-pin-label firstname"
                                type="text"
                                floatingLabelText="First Name"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style={textFieldStyle}
                                fullWidth={true}
                                inputStyle={textFieldInputStyle}
                                refs="firstName"
                                value={this.props.firstName}
                                onChange={(e) => {
                                    this.props.setFirstName(e);
                                        }}
                                required
                                //errorText={this.props.domesticProp.errors["firstName"]}
                               // errorStyle
                              //  ={errorStyle}
                                underlineStyle={underlineStyle}>
                                </TextField>
                </form>
                </div>
            </div>
            )
        }      
}; 
