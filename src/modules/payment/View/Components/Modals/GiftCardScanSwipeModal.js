import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import TextField from 'material-ui/TextField';

import giftCardSvg from '../../../../../resources/images/Gift_Card.svg';
import closeIcon from '../../../../../resources/images/Text_Close.svg';

import './giftCardScanSwipeModal.css';

export default class GiftCardScanSwipeModal extends Component {

    constructor(props){
        super(props);

        this.state={
            isDisabled:true
        }
    }

    componentDidMount(){
        // this.openCameraScanner();
    }

    // openCameraScanner = () => {
    //     console.log('OPEN CAMERA SCANNER');
    //     if(window.cordova) {
    //     console.log('Cordova Present');
    //     window.cordova.plugins.barcodeScanner.scan(
    //         this.cameraScanSuccess,
    //         this.cameraScanFailure,
    //         {
    //         preferFrontCamera : true, // iOS and Android
    //         prompt : "Place a barcode inside the scan area", // Android
    //         resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    //         orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
    //         disableAnimations : true, // iOS
    //         disableSuccessBeep: false, // iOS and Android
    //         formats : "QR_CODE,PDF_417,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,DATA_MATRIX,CODABAR,ITF,RSS14,MSI,AZTEC"
    //         }
    //     );
    //     }
    //     else {
    //     console.log('Cordova not Present');
    //     }
    // }

    cameraScanSuccess = (result) => {
        //console.log("We got a barcode\n", "Result: ", result.text, "\n", "Format: ", result.format, "\n", "Cancelled: ", result.cancelled);
        console.log('Barcode Scanned. Result text: ', result.text)
        this.retrieveSku(result.text)
    }

    cameraScanFailure = (error) => {
        console.log("Camera scanning failed: ", error);
    }


    render() {
    debugger;
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
        var errorStyle= {
            paddingTop:'30px',
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: window.innerWidth > 1900?'32px':'32px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.21',
            letterSpacing: '2px',
            textAlign: 'right',
            color: '#d53560', 
            bottom: "30px"
        }
        return (
        
        <Modal
            open={this.props.props.giftCardModal}
            //onClose={this.props.props.closeCardAuthorizationModal}
            classNames={{modal: 'scan-giftCard-modal'}}
            little
            showCloseIcon={false}
            onClose={this.props.props.handleGiftCardModal}
            closeOnOverlayClick={false}
        >
            <div className="scan-giftCard-Container">

                <img className="scan-giftCard-icon" src={giftCardSvg} alt="giftCard"/>
                <div className={this.props.props.isPinReq?"scan-giftCard-label giftCard-pin":"scan-giftCard-label"}>{this.props.props.isPinReq?"Payment - Gift Card":"Scan or Swipe Gift Card"}</div>
                <div className="scan-giftCard-label-line2">{this.props.props.isPinReq?null:"OR"}</div>


                
                <TextField
                    className="scan-giftCard-textfield"
                    type="number"
                    floatingLabelText={this.props.props.isPinReq?"Enter PIN":"Gift Card Number"}
                    value={this.props.props.isPinReq?this.props.props.PinNUM:this.props.props.giftCardNumber}
                    floatingLabelStyle={textFieldFloatingLabelStyle}
                    inputStyle={textFieldInputStyle}
                    underlineStyle={textFieldUnderlineStyle}
                    style={textFieldStyle}   
                    errorText={this.props.props.error}    
                    errorStyle ={errorStyle}          
                    onChange={(e)=>{
                        if(e.target.value == ""){
                            {/* this.handleGiftCardNumInput(e) */}
                            this.setState({isDisabled:true})
                        }else{
                            if(this.props.props.isPinReq){
                                this.props.props.handlePinNUMInput(e);
                            }else{
                                this.props.props.handleGiftCardNumInput(e)
                            }
                            this.setState({isDisabled:false})
                        }

                        }} 
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.props.props.keyGiftCard(this.props.props.giftCardNumber);
                            }
                        }} 
                />

                <div className="scan-giftCard-buttonContainer">
                    <button className="scan-giftCard-cancelButton" onClick={this.props.props.handleGiftCardModal}><img src={closeIcon} className="scan-giftCard-closeIcon"></img>CANCEL</button>
                    <button className={this.state.isDisabled?"scan-giftCard-acceptButton giftCard-disabled":"scan-giftCard-acceptButton"} disabled={this.state.isDisabled} onClick={() => {
                        this.props.props.keyGiftCard(this.props.props.giftCardNumber);

                        }}>OK</button>
                </div>

            </div>

        
        </Modal>


        );
    }
}