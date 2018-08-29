import React, { Component } from 'react'

import './postVoid.css';
import closeicon from '../../resources/images/Cross_Black.svg';
import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSpinner } from '../common/loading/spinnerAction';
import postVoidDetailsTransaction from '../post-void/postVoidAction';
import postVoidIcon from '../../resources/images/Post_Void_Black_SFF.svg';
import crossicon from '../../resources/images/Close_Bttn_Purple.svg';
import TextField from 'material-ui/TextField/TextField';
import scan from '../../resources/images/Scan_Item_Borderless.svg';
import {postVoidTransactionList} from '../post-void/postVoidAction';
class PostVoid extends Component {

        constructor(props) {
        super(props);
        this.state = {
            modal_post_void: false,
            modal_post_voidselect: false,
            modal_post_voidenter: false
        }
    }

componentDidMount(){
    console.log("props isss",this.props)
}
    render() {
        return (
            <div>
                <div className='post-void-modal-container'>
                    <div><img src={closeicon} className="closeicon" onClick={this.props.closeModal1} /></div>
                    <div><img src={this.props.modalIcon} className='post-void-modal-icon' /></div>
                    <div className='post-void-modal-label'>{this.props.modalMessage}</div>
                    <div className='post-void-modal-button-area'>
                        <button className='post-void-modal-button-select'><span className='post-void-modal-button-select-label' onClick={() => this.props.openselectTrans(this.props.userPin)}>SELECT TRANS #</span></button>
                        <button className='post-void-modal-button-enter'><span className='post-void-modal-button-enter-label' onClick={this.props.openenterTrans}>ENTER TRANS #</span></button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ postvoidgettransaction}) {
    return { postvoidgettransaction };
}

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        startSpinner:startSpinner}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostVoid);

export class PostVoidEnter extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            modal_post_void: false,
            modal_post_voidselect: false,
            modal_post_voidenter: false
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
                    <div className=""><img className="post-void-modal-iconenter" src={this.props.modalIcon} /></div>
                    <div className="post-void-modalenter-labelcont"><label className="post-void-modalenter-label">Enter Trans #</label></div>
                    {(window.innerWidth > 1900) ?
                        (<div className="textfield-scan-cls">
                            <TextField
                                required
                                type="text"
                                floatingLabelText="Transaction #"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                fullWidth={true}
                                inputStyle={textFieldInputStyle}
                                style={textFieldStyle}
                                onChange={this.props.onChangeTransNumber}
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
                        <button className="entercancelbtn" onClick={this.props.cancelEnterTrans}><img className="reseticonselectrans" src={crossicon} /><label className="cancellabel">CANCEL</label></button>
                        <button className="enterokbtn"><label className="oklabel" disabled>OK</label></button>


                    </div>
                </div>
            </div>
        );
    }
}
