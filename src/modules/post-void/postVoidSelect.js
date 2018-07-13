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
            active: null
        }
    }
    componentWillReceiveProps(nextProps) {
        
        if(nextProps.postvoidtransdetails.detailsFetchSuccessFlag === true) {
            console.log("READY TO NAVIGATE");
            console.log(this.props.history);
            if(window.innerWidth>1080){
                this.props.history.push('/postvoiddetails')
            }
            else{
                this.props.history.push('/postvoiddetailsff')
            }
            
        }
        else {
            console.log("NOT READY TO NAVIGATE - FETCH FAILURE");
        }
    }
    postVoidTransInvoker = () => {
        
        this.props.PostVoidTransDetls();
    }
    toggle = (position) => {
        if (this.state.active === position) {
            this.setState({ active: null })
            document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = ".4";
        } else {
            this.setState({ active: position })
        }
    }

    myColor = (position) => {
        if (this.state.active === position) {
            document.getElementsByClassName('post-void-modalselect-okbtn')[0].style.opacity = "1";
            return "#4b2b6f";

        }
            return "";
    }
    mytextColor = (position) => {
        if (this.state.active === position) {
            return "#fff";
        }
        return "";

    }


    render() {
        return (
            <div>

                <div className='post-void-modalselect-container'>
                    <div className="postvoid-modalselect-header">
                        <div className="postvoid-modalselect-label">Please select a Trans #</div>
                    </div>
                    <div className="postvoid-selectionarea">
                        <div style={{ background: this.myColor(0) }} onClick={() => { this.toggle(0) }} className="carditemlayoutinitial"><label style={{ color: this.mytextColor(0) }} className="labelcardlayout">03055 TAKE-164.65</label></div>
                        <div style={{ background: this.myColor(1) }} onClick={() => { this.toggle(1) }} className="carditemlayoutremain" ><label style={{ color: this.mytextColor(1) }} className="labelcardlayout">03055 TAKE-164.65</label></div>
                        <div style={{ background: this.myColor(2) }} onClick={() => { this.toggle(2) }} className="carditemlayoutremain" ><label style={{ color: this.mytextColor(2) }} className="labelcardlayout">03055 TAKE-164.65</label></div>
                        <div style={{ background: this.myColor(3) }} onClick={() => { this.toggle(3) }} className="carditemlayoutremain"><label style={{ color: this.mytextColor(3) }} className="labelcardlayout">03055 TAKE-164.65</label></div>
                        <div style={{ background: this.myColor(4) }} onClick={() => { this.toggle(4) }} className="carditemlayoutremain"><label style={{ color: this.mytextColor(4) }} className="labelcardlayout">03055 TAKE-164.65</label></div>
                        <div style={{ background: this.myColor(5) }} onClick={() => { this.toggle(5) }} className="carditemlayoutremain"><label style={{ color: this.mytextColor(5) }} className="labelcardlayout">03055 TAKE-164.65</label></div>
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

function mapStateToProps({ postvoidtransdetails,postvoidgettransaction }) {
    return { postvoidtransdetails,postvoidgettransaction, };
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({ PostVoidTransDetls: postVoidDetailsTransaction,
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoidSelect);