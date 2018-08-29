import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';

import BarcodeModal from './barcodeModal.js';

import './enterBarcode.css';

/**
 * import components
 */
import SendTitleHeader from '../FreqShippedAddresses/SendTitleHeader/Controller/sendTitleHeader';

export default class EnterBarcode extends Component {

    constructor(props){
        super(props);

        this.state ={
            showBarcodePopup: false,
        }
    }

    handleShowBarcodePopup = () =>{
        if(this.state.showBarcodePopup){
            this.setState({showBarcodePopup:false})
        }else{
            this.setState({showBarcodePopup:true})
        }
    }

    render() {

        const ServicesFooter = this.props.optionalFooter;

        return (
            <Fragment>
                <SendTitleHeader
                    title={"Scan or Key Send Envelope Barcode"}
                />
                <div className={"send-barcode-containerFlex"}>
                    <div className={"send-barcode-scannerFlex"}>
                            <div className="send-scanner-inner-top-div">
                                <div className="send-scanner-inner-corner-div left-top"></div>
                                <div className="send-scanner-inner-space-div"></div>
                                <div className="send-scanner-inner-corner-div right-top"></div>
                            </div>
                            <div className="send-scanner-inner-camera-div">
                                
                            </div>
                            <div className="send-scanner-inner-bottom-div">
                                <div className="send-scanner-inner-corner-div left-bottom"></div>
                                <div className="send-scanner-inner-space-div"></div>
                                <div className="send-scanner-inner-corner-div right-bottom"></div>
                            </div>
                        {/* <div className="send-scanner-sku-display">
                            <div className="send-scanner-sku-text">
                                {this.props.scannedSKU}
                            </div>
                        </div> */}
                    </div>
                    <div className={"send-barcode-dividerTextFlex"}>
                        <div className={"send-barcode-dividerText"}>OR</div>
                    </div>
                    <div className={"send-barcode-keyInButtonFlex"}>
                        <button className={"send-barcode-keyInButton"} onClick={()=>{this.setState({showBarcodePopup:true});}}>Key In Barcode</button>
                    </div>
                </div>
                <ServicesFooter additionalStyle={'sendComponent-offset'}>
                    <div  className="giftwrap-cancel" onClick={this.props.history.goBack}><span className="giftwrap-cancel-text">Cancel</span></div>
                    <div className={'giftwrap-next'} 
                        onClick={() => {this.props.componentChangeHandler(this.props.sendType);console.log(this.props.sendType)}}>
                    <span className="giftwrap-next-text">Next</span></div>
                </ServicesFooter>

                
                <Modal classNames={{ modal: 'key-sku-modal-container' }} open={this.state.showBarcodePopup} onClose={() => this.setState({ showBarcodePopup: false })}
                little showCloseIcon={false}>
                    <BarcodeModal
                        handleShowBarcodePopup={this.handleShowBarcodePopup}
                        updateObjectHandler={this.props.updateObjectHandler}
                    >
                        
                    </BarcodeModal>
                </Modal>
            </Fragment>
        );
    }
}