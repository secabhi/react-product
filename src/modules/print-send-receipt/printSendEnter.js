
import React, { Component } from 'react'
import '../post-void/postVoid.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import {PrintSendDetailsTransaction} from '../print-send-receipt/printRecieptAction';
import ReceiptIcon from '../../resources/images/Receipt_120.svg';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';

 class PrintSendEnter extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            modal_print_send: false,
            modal_print_sendselect: false,
            modal_print_sendenter: false,
            isDisabled:true,
            transNumber:null
        }
    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.PrintSendtransdetails.detailsFetchSuccessFlag===true)
        {   
            this.props.history.push('/print-send-receipt');
            this.props.startSpinner(false);
        }
    }

    handleKeyUp = (event) => {
        if(event.key === 'Enter') {
            if(!this.state.isDisabled)
            {
                this.PrintSendInvoker()
            }
            
        }
    } 



    PrintSendInvoker = () => {
        this.props.startSpinner(true);
        this.props.PrintSendTransInvoker(this.props.login.userpin,this.state.selectedTransactionDetails,this.state.transNumber);    

    }
    onChangeTransNumber = (event) =>{
        this.setState({transNumber:event.target.value});
        if(event.target.value>0)
        {
            this.setState({isDisabled:false});            
        }
        else{
            this.setState({isDisabled:true});
        }
    }
    render() {
        var textFieldFloatingLabelStyle = {

            height: (window.innerWidth > 1900) ? '28px' : '74px',
            fontSize: (window.innerWidth > 1900) ? '30px' : '56px',
            fontWeight: '300',
            top: (window.innerWidth > 1900) ? '0px' : '9px',
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            lineHeight: '1.21',
            textAlign: 'left',
            color: (window.innerWidth > 1900) ? '#828282' : ' #333333'
        }
        var textFieldInputStyle = {
            height: (window.innerWidth > 1900) ? '37px' : '74px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '56px',
            lineHeight: '1.19',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: '2px',
            textAlign: 'left',
            color: '#505050',
            paddingBottom: (window.innerWidth > 1900) ? '4.5px' : '0px',
            paddingLeft: (window.innerWidth > 1900) ? '13px' : '0px',
            paddingTop: (window.innerWidth > 1900) ? '0px' : '0px',
            marginTop: (window.innerWidth > 1900) ? '10px' : '0px!important'


        }
        const textFieldStyle = {
            paddingTop: (window.innerWidth > 1900) ? '0px' : '30px',
            height: '60px',
            width: (window.innerWidth > 1900) ? '602.5px' : '738px',
            maxWidth: '680px'
        }
        return (
            <div>
                <div className="postvoidmodal-enter-container">
                    <div className=""><img className="post-void-modal-iconenter" src={ReceiptIcon} /></div>
                    <div className="post-void-modalenter-labelcont"><label className="post-void-modalenter-label">Enter Trans #</label></div>
                    {(window.innerWidth > 1900) ?
                        (<div className="textfield-scan-cls">
                            <TextField
                                required
                                type="number"
                                floatingLabelText="Transaction #"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                fullWidth={true}
                                inputStyle={textFieldInputStyle}
                                style={textFieldStyle}
                                onChange={this.onChangeTransNumber}
                                onKeyUp={this.handleKeyUp} 
                            />
                            <img className="postvoid-scan" src={scan} /></div>) :

                        (<div className="textfield-scan-cls">
                            <TextField
                                required
                                type="text"
                                floatingLabelText="Trans #"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                fullWidth={true}
                                inputStyle={textFieldInputStyle}
                                style={textFieldStyle}
                            />
                            <img className="postvoid-scan" src={scan} />
                        </div>
                        )}




                    <div className="entertrans-button-area">
                        <button className="entercancelbtn" onClick={this.props.closeenterTransPrint}><img className="reseticonselectrans" src={crossicon} /><label className="cancellabel">CANCEL</label></button>
                        <button className={this.state.isDisabled?"enterokbtn disable":"enterokbtn enabled"} disabled={this.state.isDisabled}><label className="oklabel" onClick={this.state.isDisabled?'':this.PrintSendInvoker}>OK</label></button>


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
    return bindActionCreators({ PrintSendTransInvoker: PrintSendDetailsTransaction,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintSendEnter);