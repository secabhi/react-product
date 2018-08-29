import React, { Component } from 'react'

import './PrintSend.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { PrintSendDetailsTransaction } from '../print-send-receipt/printRecieptAction'
import postVoidIcon from '../../resources/images/Post_Void_Black_SFF.svg';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';

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
        this.props.startSpinner(true);
    }

    componentWillReceiveProps(nextProps) {
        
        console.log('PostVoidSelect componentWillReceiveProps: ', nextProps);
        if(nextProps.PrintSendgettransaction.listFetchSuccessFlag === true) {
            this.props.startSpinner(false);
            this.setState({ transactionList : nextProps.PrintSendgettransaction.response.transactionList });
        }
        else {
            if(nextProps.PrintSendgettransaction.defaultValue !== true) {
                this.props.startSpinner(false);
            }
        }
        if(nextProps.PrintSendtransdetails.detailsFetchSuccessFlag===true)
        {
            this.props.history.push('/print-send-receipt');
        }
        if (nextProps.PrintSendgettransaction.transFail === true) {
            this.props.startSpinner(false);
            this.props.cancelSelectPrintModal();
            this.props.OpenErrorModal();
          }

    }

    printSendTransInvoker = () => {
        console.log("select",this.props)
        if(this.state.selectedTransaction !== '') {
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
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintSendSelect);