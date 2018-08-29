import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';

import payment from '../../../../../resources/images/Payment.svg';


export class CardAuthorizationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled:true,
        }

    }
    
    render() {
        //console.log('modal props', this.props.props)
        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '55px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
        }
        
       const textFieldInputStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            // height: "18px",
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "32px" : "48px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",
            paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
            paddingLeft: (window.innerWidth > 1900) ? "0px" : "10px",
        }

       const textFieldUnderlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }

        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '26px' : '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
        }

        return (
        
        <Modal
            open={this.props.props.authModal}
            onClose={this.props.props.closeCardAuthorizationModal}
            classNames={{modal: 'card-auth-modal'}}
            little
            showCloseIcon={false}
            closeOnOverlayClick={false}
        >
            <div>

                <img className="card-auth-icon" src={payment} alt="payment"/>
                <div className="card-auth-label">Call for Authorization</div>

                <TextField
                    className="card-auth-textfield"
                    type="number"
                    floatingLabelText="Enter Authorization"
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    inputStyle={textFieldInputStyle}
                    underlineStyle={textFieldUnderlineStyle}
                    style={textFieldStyle}
                    onChange={(e)=>{
                        if(e.target.value == ""){
                            this.handleAuthorizationCodeInput(e)
                            this.setState({isDisabled:true})
                        }else{
                            this.handleAuthorizationCodeInput(e)
                            this.setState({isDisabled:false})
                        }}}
                        onKeyPress={(e) => {
                                    if(e.key === 'Enter') {
                                        e.preventDefault();
                                        this.props.props.getAmountDue.bind(this, this.props.props.currentCard)
                                        }
                                    }}
                />

                <div className="card-info-container">
                    <div className="card-label-container">
                        <div className="card-info-label">Tender </div>
                        <div className="card-info-label">Phone </div>  
                        <div className="card-info-label">Merchant# </div>
                        <div className="card-info-label">Amt </div>
                        <div className="card-info-label">Referral# </div> 
                    </div>

                    <div className="card-data-container">
                        <div className="card-info-data">{this.props.props.transInfo.length>0?this.props.props.transInfo[this.props.props.currentCard].CardType:""}</div>{/* {this.props.props.transInfo[this.props.props.currentCard].CardType}</div> */}
                        <div className="card-info-data">1</div>
                        <div className="card-info-data">{this.props.props.transInfo.length>0?this.props.props.transInfo[this.props.props.currentCard].ProcessorMerchantId:""}</div>{/*{this.props.props.transInfo[this.props.props.currentCard].GetCardBINResponse.ECOMMInfo[0].MerchantIdentifier}*/}
                        <div className="card-info-data">${this.props.props.payValues.length>0?this.props.props.payValues[this.props.props.currentCard]:""}</div>{/*{this.props.props.payValues[this.props.props.currentCard]}*/}
                        <div className="card-info-data">{this.props.props.transInfo.length>0?this.props.props.transInfo[this.props.props.currentCard].ReferralNUM:""}</div>{/*{this.props.props.transInfo[this.props.props.currentCard].ReferralNum}*/}
                    </div>
                </div>

                <div className="card-auth-button-container">
                    <div className="card-auth-button-cancel"
                        onClick={this.props.props.closeCardAuthorizationModal}>CANCEL</div>

                    <button onClick={this.props.props.getAmountDue.bind(this, this.props.props.currentCard)} className={this.state.isDisabled?"scan-giftCard-acceptButton giftCard-disabled":"scan-giftCard-acceptButton"} disabled={this.state.isDisabled}>OK</button>
                </div>

            </div>

        
        </Modal>


        )
    }

    handleAuthorizationCodeInput = (e) => {
        this.props.props.handleAuthorizationCodeInput(e)
    }
    
};
