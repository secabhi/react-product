import React, { Component } from 'react';
import { TextField } from 'material-ui';
import Modal2 from '../../../../UI/modal-two/modal-two';
import cancelBtnImage from '../../../../resources/images/Close_Bttn_Purple.svg';
import transModifyImage from '../../../../resources/images/Trans_Modify.svg';
import './associateDiscount.css';
import '../transDiscount/transDiscount.css'

export default class AssociateDiscountModal extends Component  {
    constructor(props){
        super(props);
        this.state = {
            pin: '',
            id: '',
        }
    }

    render() {
        if(window.innerWidth < 1900) {
            return<this.SffModal />
          }
        return (
            <this.LffModal />
        )    
    }   

     LffModal = () => {
        const {applyAssociateDiscount, done} = this.props;

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
            <Modal2   
                style={{
                    width:'726px',
                    height:'702px',
                    top:'310px',
                    left:'700px',
                    background: 'white',
                    boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
                }}
                overlay
            >    
                <div className="modal-lff-extra-height-flex" style={{height: '702px'}}>
                    <img className="modal-icon" style={{marginTop: "80px"}} src={transModifyImage} />
                    <div className="modal-title" style={{marginTop: "25px", fontWeight: "500"}} >Associate Trans</div>
                    <div className="asd-numbertext">
                        <TextField
                                type="tel"                               
                                floatingLabelText="Enter Associate Pin for Discount"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style = {textFieldStyle}
                                underlineStyle = {underlineStyle}
                                fullWidth = {true}
                                inputStyle = {textFieldInputStyle}
                                value={this.state.pin}
                                onChange={(e) => this.onInputChangePin(e)}                                
                            /> 
                        </div>
                        <div className="asd-numbertext">
                        <TextField
                                type="tel"                               
                                floatingLabelText="Enter ID#"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style = {textFieldStyle}
                                underlineStyle = {underlineStyle}
                                fullWidth = {true}
                                inputStyle = {textFieldInputStyle}
                                value={this.state.id}
                                onChange={(e) => this.onInputChangeId(e)}                                
                            />   
                        </div>
                    
                    
                    
                   
                    <div className="modal-buttons-container-flex" style={{marginTop: "60px"}} >
                        <div className='modal-cancel-btn-flex' style={{marginRight: "40px"}} onClick={()=>{done()}} >
                            <div><img className='modal-cancel-img' src={cancelBtnImage}  alt="cancel_button" /></div>
                            <div className='modal-cancel-text'>CANCEL</div>
                        </div>
                        <div 
                            className={this.shouldBeDisabled() ? 'modal-ok-btn-flex element-disabled':'modal-ok-btn-flex'}
                            onClick={()=>{applyAssociateDiscount(this.state.pin, this.state.id)}}
                        >
                            <div className='modal-ok-text'>OK</div>
                        </div>    
                    </div>   
                </div>
            </Modal2>    
        )
    }


    SffModal = () => {
        const {applyAssociateDiscount, done} = this.props;

        var textFieldStyle = {
            height: '90px',
            width: '920px',           
            paddingTop: '0px'
        }
        
        var textFieldFloatingLabelStyle = {
            height: '40px',
          fontSize: '48px',
          fontWeight: '300',
          fontFamily : 'Roboto',
          fontStyle: 'normal',
          fontStretch: 'normal',
          letterSpacing: '2px',
          lineHeight: '0',
          textAlign: 'left',
          color: '#828282',
          top: '30px',

      }
        var textFieldInputStyle = {
            height: '86px',
          fontFamily: 'Roboto',
          fontSize: '48px',
          lineHeight: '1.19',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontStretch: 'normal',
          letterSpacing: '2px',
          textAlign: 'left',
          color: '#333333'
      }
      var underlineStyle= {
        backgroundColor: '#828282',
        height:'0.8px',
        bottom:'8px'
    }
    var underlineStyleTextArea= {
        display:'none'
    }
        return (
            <Modal2   
                style={{
                    width:'100%',
                    height:'1298px',
                    top:'529px',
                    left:'0px',
                    background: 'white'
                }}
            >    
                <div className="associateDiscount-sff">
                    <div className="associateDiscount-title">Trans Modify: Associate Trans</div>
                    <div className="asd-numbertext-sff">
                        <TextField
                                type="text"                               
                                floatingLabelText="Enter Associate Pin for Discount"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style = {textFieldStyle}
                                underlineStyle = {underlineStyle}
                                fullWidth = {true}
                                inputStyle = {textFieldInputStyle}
                                value={this.state.pin}
                                onChange={(e) => this.onInputChangePin(e)}                                
                            /> 
                        </div>
                        <div className="asd-numbertext-sff">
                        <TextField
                                type="text"                               
                                floatingLabelText="Enter ID#"
                                floatingLabelStyle={textFieldFloatingLabelStyle}
                                style = {textFieldStyle}
                                underlineStyle = {underlineStyle}
                                fullWidth = {true}
                                inputStyle = {textFieldInputStyle}
                                value={this.state.id}
                                onChange={(e) => this.onInputChangeId(e)}                                
                            />   
                        </div>
                    
                    
                    <div className="asd-sff-btn-container">
                        <div className='modal-sff-btn-cancel' style={{marginRight: "50px"}} onClick={()=>{done()}} >
                                <div><img className='modal-sff-cancel-img ' style={{marginRight: '20px', marginLeft: '10px'}} src={cancelBtnImage}  alt="cancel_button" /></div>
                                <div style={{marginRight: '10px'}}>CANCEL</div>
                        </div>
                        <div 
                            className={this.shouldBeDisabled() ?  'modal-sff-btn-ok element-disabled' : 'modal-sff-btn-ok'} 
                            onClick={()=>{applyAssociateDiscount(this.state.pin, this.state.id)}}
                        >
                            <div>OK</div>
                        </div>
                    </div>
                </div>
            </Modal2>    
        )
    }

    onInputChangePin(e){
        const re = /^[0-9\b]+$/;
       
       if (e.target.value == '' || re.test(e.target.value)) {
        this.setState({pin : e.target.value})
       }
    }
    onInputChangeId(e){
        const re = /^[0-9\b]+$/;
       
       if (e.target.value == '' || re.test(e.target.value)) {
        this.setState({id : e.target.value})
       }
    }
   
    shouldBeDisabled(){
        if(this.state.id.length == 4 && this.state.pin.length <= 6 ) {
            if(this.state.id/1 >= 1 && this.state.pin/1 >= 1) {
                return false;
            }else {
               return true; 
            }   
        } else {
           return true; 
        }
    }
   
}
