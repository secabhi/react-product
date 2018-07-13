import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './giftRegistry.css';
import clearallbtn from '../../../../resources/images/Close_Bttn_Purple.svg';
import item_Modify from '../../../../resources/images/Cancel_Purple_SFF.svg';
import Cancel_Purple_SFF from '../../../../resources/images/Cancel_Purple_SFF.svg';
import info from '../../../../resources/images/Item_Modify_Black.svg';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {updateReplishmentData,getReplenishment} from './sale-item-replishmentAction';

export default class GiftRegistryModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gifregNum:''
        }
    }
    componentWillReceiveProps = nextProps => {
    }

    componentWillMount() {
    }

    changeRegistryNumber(){
    }
    render() {
        var textFieldStyle = {
            height: '90px',
            width:'620px',
            paddingTop: '0px'
        }
        
        var textFieldFloatingLabelStyle = {
          height: '28px',
          fontSize: '32px',
          fontWeight: '300',
          fontFamily : 'Roboto',
          fontStyle: 'normal',
          fontStretch: 'normal',
          letterSpacing: '2px',
          lineHeight: '1.21',
          textAlign: 'left',
          color: '#828282',
          top: '30px'
      }
        var textFieldInputStyle = {
            height: '86px',
          fontFamily: 'Roboto',
          fontSize: '32px',
          lineHeight: '1.19',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontStretch: 'normal',
          letterSpacing: '2px',
          textAlign: 'left',
          color: '#333333',
          paddingBottom: '4.5px',
          paddingLeft:'13px',
          paddingTop:'0px'
      }
      var underlineStyle= {
        backgroundColor: '#828282',
        height:'0.8px'
    }
    var underlineStyleTextArea= {
        display:'none'
    }
    
        return (
            <div >
           
                        <div className='gift-registry-modal-lff'>
                            <div className="image-holder-lff">
                            <img src={info}/>
                            </div>
                        <div className="giftregistry-text-lff">
                            Gift Registry
                        </div>
                        <div className="gift-registry-numbertext">
                        <TextField
                                type="text"
                                maxLength="6"
                                floatingLabelText="Gift Registry Number"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style = {textFieldStyle}
                                underlineStyle = {underlineStyle}
                                fullWidth = {true}
                                inputStyle = {textFieldInputStyle}
                                
                                
                            />
                           <img src={info} className="scannerimage"/>   
                        </div>
                        

                        <div className="giftregistry-button-section-lff">
                        <button className="cancelbtn">
                        <img src={clearallbtn} className="cancelimg-replishment-lff"/>
                        <div className="canceltxt" onClick={() => {this.props.showGiftRegistryModal(false)}}>CANCEL</div>
                        </button>
                        <button className="okbtn">
                        <div className="oktxt" >OK</div>
                        </button>
                        </div>
                        
                        </div>  
            </div>
        )
    }
};

