//Dependency
import React, { Component } from 'react'

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import { postVoidDetailsTransaction } from '../post-void/postVoidAction'

//resources
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';

//styles
import './postVoid.css';

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
                        this.props.postvoid.voidTransactionList.map(function(item,index) {
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

    componentDidMount() {     
        this.props.startSpinner(true);
    }

    componentDidUpdate() {
        this.props.startSpinner(false);
    }

    postVoidTransInvoker = () => {
        if(this.state.selectedTransaction !== '') {
            this.props.PostVoidTransDetls(this.props.login.userpin, this.props.postvoid.voidTransactionList[this.state.selectedTransaction], this.props.postvoid.voidTransactionList[this.state.selectedTransaction].transactionID);
            this.props.history.push('/postvoiddetails');
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
}

function mapStateToProps({ postvoid,login }) {
    return { postvoid, login};
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({ PostVoidTransDetls: postVoidDetailsTransaction,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoidSelect);