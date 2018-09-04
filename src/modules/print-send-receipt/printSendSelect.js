import React, { Component } from 'react'

import './PrintSend.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { PrintSendDetailsTransaction,clearIsValid } from '../print-send-receipt/printRecieptAction'
import postVoidIcon from '../../resources/images/Post_Void_Black_SFF.svg';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';

import {showException} from '../common/exceptionErrorModal/exceptionAction'

class PrintSendSelect extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            modal_post_void: false,
            modal_post_voidselect: false,
            modal_post_voidenter: false,
            active: null,
            transactionList : [],
            selectedTransaction : "",
            selectedTransactionDetails : {}
        }
    }

    componentDidMount() {     
        //this.props.startSpinner(true);
    }

    componentWillReceiveProps(nextProps) {
        
        console.log('print props ', nextProps);
        if(nextProps.PrintSendgettransaction.isValid)
        {   
            if(nextProps.PrintSendgettransaction.listFetchSuccessFlag === true) {
                this.props.startSpinner(false);
                this.setState({ modal_print_sendselect: true });
                this.setState({ transactionList : nextProps.PrintSendgettransaction.response.transactionList });
            }
            else {
                if(nextProps.PrintSendgettransaction.defaultValue !== true) {
                        this.props.startSpinner(false);
                }
            }

            if (nextProps.PrintSendgettransaction.transFail === true) {
                this.props.startSpinner(false);
                //this.setState({ modal_print_sendselect: true });

                this.props.OpenErrorModal();
              }
        }
        else{
            if(nextProps.PrintSendgettransaction.error_message!='')
                {
           // alert('network error')
                this.props.callErrorException(
                {showException: true,
                error:{failedModule:'Print/Send Get Transactions',
                failureReason:'Unexpected Response',
                failureDescription:nextProps.PrintSendgettransaction.error_message}})
                }
                this.props.clearIsvalidFlag();
        }

        if(nextProps.PrintSendtransdetails.isValid)
        {   
            if(nextProps.PrintSendtransdetails.detailsFetchSuccessFlag===true)
            {   this.props.startSpinner(false);
                this.props.history.push('/print-send-receipt');
            }
           else if(nextProps.PrintSendtransdetails.dataFrom=='TRANS_DETAILS_FAIL' && nextProps.PrintSendtransdetails.detailsFetchSuccessFlag===false){
                this.props.startSpinner(false);
                this.props.cancelSelectPrintModal();
                this.props.OpenErrorModal();
            }
            
        }
        else{
            if(nextProps.PrintSendtransdetails.error_message!='')
                {
           // alert('network error')
                this.props.callErrorException(
                {showException: true,
                error:{failedModule:'Print/Send Get Transaction Details',
                failureReason:'Unexpected Response',
                failureDescription:nextProps.PrintSendgettransaction.error_message}})
                }
                this.props.clearIsvalidFlag();
        }
       

    }
    

    printSendTransInvoker = () => {
        console.log("select",this.props)
        if(this.state.selectedTransaction !== '') {
            this.props.startSpinner(true);
        this.props.PrintSendTransDetls(this.props.login.userpin,this.state.selectedTransactionDetails,this.state.selectedTransactionDetails.transactionID);
        //this.props.history.push('/postvoiddetails');
        }
        else {
            //DO NOTHING
        }
    }
    toggle = (index) => {
        if (this.state.selectedTransaction === index) {
            this.setState({ selectedTransaction: '', selectedTransactionDetails : {} })
            document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = ".4";
        } else {
            this.setState({ selectedTransaction: index, selectedTransactionDetails : this.state.transactionList[index] })
            document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = "1";
        }
    }

    render() {
        var selectedStyle = {
            background: "#4b2b6f"
        }
        var unselectedStyle = {
            background: "#FFFFFF"
        }
        var selectedTextStyle = {
            color : "#FFFFFF"
        }
        var unselectedTextStyle = {
            color : "#000000"
        }
        return (
            <div>

                <div className='post-void-modalselect-container'>
                    <div className="postvoid-modalselect-header">
                        <div className="postvoid-modalselect-label">Please select a Trans #</div>
                    </div>                    
                    <div className="postvoid-selectionarea">
                    {
                        this.state.transactionList.map(function(item,index) {
                            var rowObject = (
                                <div style={(this.state.selectedTransaction === index)?(selectedStyle):(unselectedStyle)} onClick={() => this.toggle(index)} key={index} className="carditemlayoutinitial">
                                    <label style={(this.state.selectedTransaction === index)?(selectedTextStyle):(unselectedTextStyle)} className="labelcardlayout" >
                                        {item.transactionID} - {item.amount}
                                    </label>
                                </div>
                            )
                            return (
                                rowObject
                            );
                        },this)
                    }                    
                    </div>
                    <div className='post-void-modalselect-button-area'>
                        <button className='post-void-modalselect-cancelbtn' onClick={this.props.cancelSelectPrintModal}><img className="reseticonselectrans" src={crossicon} /><span className='post-void-cancel-label'>CANCEL</span></button>
                        <button className='post-void-modalselect-okbtn' onClick={this.printSendTransInvoker}><span className='post-void-ok-label' disabled>OK</span></button>
                    </div>
                </div>
            </div>
        );
    }
    
}

function mapStateToProps({ PrintSendtransdetails,PrintSendgettransaction,login }) {
    
    return { PrintSendtransdetails,PrintSendgettransaction, login};
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({ PrintSendTransDetls: PrintSendDetailsTransaction,
        callErrorException: (data)=> showException(data),
        clearIsvalidFlag:clearIsValid,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintSendSelect);