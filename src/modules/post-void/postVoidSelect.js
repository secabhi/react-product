import React, { Component } from 'react'

import './postVoid.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { postVoidDetailsTransaction } from '../post-void/postVoidAction'
import postVoidIcon from '../../resources/images/Post_Void_Black_SFF.svg';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';

class PostVoidSelect extends Component {
   

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
        if(nextProps.postvoidgettransaction.listFetchSuccessFlag === true) {
            this.props.startSpinner(false);
            this.setState({ transactionList : nextProps.postvoidgettransaction.response.transactionList });
        }
        else {
            if(nextProps.postvoidgettransaction.defaultValue !== true) {
                this.props.startSpinner(false);
            }
        }
    }

    postVoidTransInvoker = () => {
        if(this.state.selectedTransaction !== '') {
            this.props.PostVoidTransDetls(this.props.login.userpin,this.state.selectedTransactionDetails);
    
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
                        <button className='post-void-modalselect-cancelbtn' onClick={this.props.cancelSelectModal}><img className="reseticonselectrans" src={crossicon} /><span className='post-void-cancel-label'>CANCEL</span></button>
                        <button className='post-void-modalselect-okbtn' onClick={this.postVoidTransInvoker}><span className='post-void-ok-label' disabled>OK</span></button>
                    </div>
                </div>
            </div>
        );
    }
    
}

function mapStateToProps({ postvoidtransdetails,postvoidgettransaction,login }) {
    return { postvoidtransdetails,postvoidgettransaction, login};
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({ PostVoidTransDetls: postVoidDetailsTransaction,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoidSelect);