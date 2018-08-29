import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './sale-item-split-commission.css'

import item_Modify from '../../../resources/images/Item_Modify_Black.svg';
import Cancel_Purple_SFF from '../../../resources/images/Cancel_Purple_SFF.svg';
import trans_Modify from '../../../resources/images/Trans_Modify_Black.svg';

export class SaleItemSplitCommissionSFF extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userPin1: "",
            userPin2: "",
            spliterror1: "",
            spliterror2: ""

        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({spliterror1 : nextProps.spliterror["spliterror1"], spliterror2 : nextProps.spliterror["spliterror2"]})
        // if(nextProps.pin2Error !== '') {
        //     this.setState({spliterror2 : nextProps.pin2Error});
        // }
        // else {
        //     this.setState({userPin1 : '',userPin2 : ''});
        // }
    }
    
    handleValidation = (userPin1, userPin2) => {

        var spliterror1, spliterror2;

        if (userPin1.length > 0 && userPin1.length < 6) {
            spliterror1 = 'Invalid PIN entered.'

        }
        if (userPin2 && userPin2.length > 0 && userPin2.length < 6) {
            spliterror2 = 'Invalid PIN entered.'

        }
        if (spliterror1 != 'Invalid PIN entered.' && spliterror2 != 'Invalid PIN entered.') {
            if (window.innerWidth > 1080) {

                this.props.onSubmitshowSplitCommissionModal(userPin1, userPin2);
              
               // this.props.showSplitCommissionModal(false);
            }
            else {

                this.props.onSubmitshowSplitCommissionModal(userPin1, userPin2);
               // this.props.hideItemModifyModalSmallFF();
                this.setState({ spliterror2:'' })
            }

        }
        this.setState({ spliterror1: spliterror1, spliterror2: spliterror2 })

    }

    handlePin1Change = (event, index, value) => {

        if (event.target.value) {
            if (window.innerWidth > 1900) {


                document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "1";
                document.getElementsByClassName('split-commission-ok-btn')[0].classList.remove('button-disabler');



            }
            else {
                document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "1";
                document.getElementsByClassName('split-commission-ok-btn')[0].classList.remove('button-disabler');
            }
        }
        else {
            //DO NOTHING
        }
        this.setState({ userPin1: event.target.value,spliterror1: ""  });

    }
    handlePin2Change = (event, index, value) => {
        if (event.target.value) {
            if (window.innerWidth > 1900) {


               //do nothing for now



            }
            else {
                //do nothing for now
            }
        }
        else {
            //DO NOTHING
        }
        this.setState({ userPin2: event.target.value ,spliterror2: "" });

    }



    render() {
        /* TEXT FIELD STYLES FOR SPLIT COMMISSION - START */
        var textFieldFloatingLabelStylesplit = {
            paddingTop:'0px',
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.13',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333'
        }
        var textFieldInputStylesplit = {
            paddingBottom:'10px',
            bottom: '18px',
            marginTop:'18px',
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.13',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333'
        }

        var textFieldUnderlineStylesplit = {
            width: '920px',
        
            backgroundColor: '#828282'
        }
        var textFieldStylesplit = {
           
            paddingTop: '50px',
            paddingBottom: '0px'
        }
        var errorsplitStyle = {
            fontFamily: 'Roboto',
            fontSize: '40px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#d53560',
            marginRight: '70px',
            paddingTop: '20px'
        }

        /* TEXT FIELD STYLES FOR SPLIT COMMISSION - END */
        return (
            <div>
                {(this.props.type_split_commission == 'itemsplit') ? (<div className="split-commission-style">Split Commission</div>
                ) : (<div className="split-commission-style"> Trans Modify:Split Commission</div>)}

                <div className="splitinputsfirst-sff">
                    <TextField
                        required
                        type="text"
                        floatingLabelText="Enter First Commission Pin"
                        floatingLabelStyle={textFieldFloatingLabelStylesplit}
                        fullWidth={true}
                        inputStyle={textFieldInputStylesplit}
                        underlineStyle={textFieldUnderlineStylesplit}
                        style={textFieldStylesplit}
                        onChange={this.handlePin1Change}
                        value={this.state.userPin1.replace(/[^0-9]+/ig, "")}
                        errorText={this.state.spliterror1}
                        maxLength={6}
                        errorStyle={errorsplitStyle}
                    />
                </div>
                <div className="splitinputssecond-sff">
                    <TextField
                        type="text"
                        floatingLabelText="Enter Second Commission Pin"
                        floatingLabelStyle={textFieldFloatingLabelStylesplit}
                        fullWidth={true}
                        inputStyle={textFieldInputStylesplit}
                        underlineStyle={textFieldUnderlineStylesplit}
                        style={textFieldStylesplit}
                        onChange={this.handlePin2Change}
                        value={this.state.userPin2.replace(/[^0-9]+/ig, "")}
                        errorText={this.state.spliterror2}
                        errorStyle={errorsplitStyle}
                        maxLength="6"
                    />
                </div>

                {(this.props.type_split_commission == 'itemsplit') ? (<div className='split-commission-button-area-itemsplit-sff'>
                    <div onClick={() => {
                            this.setState({userPin1 : '',userPin2 : '',spliterror1:'',spliterror2:''});
                            this.props.hideItemModifyModalSmallFF();
                        }} className='split-commission-cancel-btn' >
                        <div className="cross-icon-style"> <img className="close-icon-style" src={Cancel_Purple_SFF} /></div>
                        <div className='split-commission-cancel-btn-label'>CANCEL</div>
                    </div>
                    <div onClick={this.handleValidation.bind(this, this.state.userPin1, this.state.userPin2)} className='split-commission-ok-btn button-disabler' >
                        <div className='split-commission-ok-btn-label'>OK</div>
                    </div>
                </div>) : (<div className='split-commission-button-area-transmodify-sff'>
                    <div onClick={() => {
                            this.setState({userPin1 : '',userPin2 : '',spliterror1:'',spliterror2:''});
                            this.props.hideItemModifyModalSmallFF();
                        }} className='split-commission-cancel-btn' >
                        <div className="cross-icon-style"> <img className="close-icon-style" src={Cancel_Purple_SFF} /></div>
                        <div className='split-commission-cancel-btn-label'>CANCEL</div>
                    </div>
                    <div onClick={this.handleValidation.bind(this, this.state.userPin1, this.state.userPin2)} className='split-commission-ok-btn button-disabler' >
                        <div className='split-commission-ok-btn-label'>OK</div>
                    </div>
                </div>)}

            </div>
        );
    }
};

export class SaleItemSplitCommission extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userPin1: "",
            userPin2: "",
            spliterror1: "",
            spliterror2: ""
        }
        this.handleValidation=this.handleValidation.bind(this, this.state.userPin1, this.state.userPin2)
    }

    componentWillReceiveProps(nextProps) {

        
        this.setState({spliterror1 : nextProps.spliterror["spliterror1"], spliterror2 : nextProps.spliterror["spliterror2"]})
    }


    hideSplitCommisionModal=()=>{
        this.props.showSplitCommissionModal(false);
    }

    handleValidation = (e) => {
  

        var spliterror1, spliterror2;

        if (this.state.userPin1.length > 0 && this.state.userPin1.length < 6) {
            spliterror1 = 'Invalid PIN entered.'

        }
        if (this.state.userPin2.length > 0 && this.state.userPin2.length < 6) {
            spliterror2 = 'Invalid PIN entered.'

        }
        if (spliterror1 != 'Invalid PIN entered.' && spliterror2 != 'Invalid PIN entered.') {
            if (window.innerWidth > 1080) {
                var userPin1 = this.state.userPin1;
                var userPin2 = this.state.userPin2;
                this.props.onSubmitshowSplitCommissionModal(userPin1, userPin2);
              // this.props.showSplitCommissionModal(false);
            }
            else {
                
                this.props.hideItemModifyModalSmallFF();
            }

        }
        this.setState({ spliterror1: spliterror1, spliterror2: spliterror2 })

    }

    handlePin1Change = (event, index, value) => {

        if (event.target.value) {
            if (window.innerWidth > 1900) {


                document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "1";
                document.getElementsByClassName('split-commission-ok-btn')[0].classList.remove('button-disabler');



            }
            else {
                document.getElementsByClassName('split-commission-ok-btn')[0].style.opacity = "1";
                document.getElementsByClassName('split-commission-ok-btn')[0].classList.remove('button-disabler');
            }
        }
        else {
            //DO NOTHING
        }

        this.setState({ userPin1: event.target.value, spliterror1: "" });

    }
    handlePin2Change = (event, index, value) => {
        if (event.target.value) {
            if (window.innerWidth > 1900) {

                    //do nothing for now



            }
            else {
               //do nothing for now
            }
        }
        else {
            //DO NOTHING
        }
        this.setState({ userPin2: event.target.value, spliterror2: "" });

    }




    render() {
        var textFieldFloatingLabelStyle = {
            paddingTop: '-5px',
            fontFamily: 'Roboto',
            fontSize: '32px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.34',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
            top:'11px'
        }
        var textFieldInputStyle = {
            marginTop:'4px',
            fontFamily: 'Roboto',
            fontSize: '32px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.34',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333'
        }
        var textFieldUnderlineStyle = {
            width: '620px',
        
            backgroundColor: '#828282'
        }
        var textFieldStyle = {
            // height: '60px',
            // paddingTop: '10px',
            // paddingBottom: '0px'
        }
        var errorsplitStyle = {
            bottom: '0',
           
            fontFamily: 'Roboto',
            fontSize: '26px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#d53560'



        }
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.handleValidation(e)}}>
                    {(this.props.type_split_commission == 'transmodifysplit') ? (<div className="split">
                        <img className="split-commission-icon" src={trans_Modify} alt="split-commission1" />
                    </div>) : (<div className="split">
                        <img className="split-commission-icon" src={item_Modify} alt="split-commission2" />
                    </div>)}
                    <div className="split-commission-title">Split Commission</div>
                    <div className="splitinputsfirst">
                        <TextField
                            required
                            type="text"
                            floatingLabelText="Enter First Commission Pin"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            fullWidth={true}
                            inputStyle={textFieldInputStyle}
                            underlineStyle={textFieldUnderlineStyle}
                            style={textFieldStyle}
                            onChange={this.handlePin1Change}
                            value={this.state.userPin1.replace(/[^0-9]+/ig, "")}
                            errorText={this.state.spliterror1}
                            maxLength={6}
                            errorStyle={errorsplitStyle}
                            onKeyDown={(event) => {
                                event.keyCode === 13 && this.props.onSubmitshowSplitCommissionModal(this.state.userPin1, this.state.userPin2);
                                }
                            }
                        />
                    </div>
                    <div className="splitinputssecond">
                        <TextField
                            type="text"
                            floatingLabelText="Enter Second Commission Pin"
                            floatingLabelStyle={textFieldFloatingLabelStyle}
                            fullWidth={true}
                            inputStyle={textFieldInputStyle}
                            underlineStyle={textFieldUnderlineStyle}
                            style={textFieldStyle}
                            maxLength="6"
                            onChange={this.handlePin2Change}
                            value={this.state.userPin2.replace(/[^0-9]+/ig, "")}
                            errorText={this.state.spliterror2}
                            errorStyle={errorsplitStyle}
                            disabled={this.state.userPin1 === ''}
                        />
                    </div>
                    <div className='split-commission-button-area'>
                        <div className='split-commission-cancel-btn' onClick={this.hideSplitCommisionModal.bind(this)}>
                            <div className="cross-icon-style"> <img className="close-icon-style" src={Cancel_Purple_SFF} /></div>
                            <div className='split-commission-cancel-btn-label'>CANCEL</div>
                        </div>
                        <button className="split-commission-ok-btn-label split-commission-ok-btn button-disabler" type="submit" >OK</button>
                    {/*  <div className='split-commission-ok-btn button-disabler'>}
                            
                </div>*/}
                    </div>
                </form>
            </div>
        );
    }
};