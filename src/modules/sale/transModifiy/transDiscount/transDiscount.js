import React, { Component } from 'react';

import Modal2 from '../../../../UI/modal-two/modal-two';
import cancelBtnImage from '../../../../resources/images/Close_Bttn_Purple.svg';
import transModifyImage from '../../../../resources/images/Trans_Modify.svg';
import './transDiscount.css';

export default class TransDiscountModal extends Component  {
    state = {input: undefined};
    discountThreshold = undefined;

    render() {
        if(window.innerWidth < 1900) {
            return<this.SffModal />
          }
        return (
            <this.LffModal />
        )    
    }   

   LffModal = () => {
        const {applyTransDiscount, done} = this.props;
        return (
            <Modal2   
                style={{
                    width:'726px',
                    height:'529px',
                    top:'310px',
                    left:'700px',
                    background: 'white',
                    boxShadow: '0 6px 35px 0 rgba(0, 0, 0, 0.6)'
                }}
                overlay
            >    
                <div className="modal-lff-flex">
                    <img className="modal-icon" style={{marginTop: "80px"}} src={transModifyImage} />
                    <div className="modal-title" style={{marginTop: "25px", fontWeight: "500"}} >Trans Discount</div>
                    <input 
                        className="modal-input-field" 
                        value={this.state.input}  style={{marginTop: "65px"}} type="text" placeholder="Enter % Off" 
                        onChange={(e)=> this.onNextCharInput(e.target.value)} maxLength="3"
                    />
                    <div className="modal-buttons-container-flex" style={{marginTop: "50px"}} >
                        <div className='modal-cancel-btn-flex' style={{marginRight: "40px"}} onClick={()=>{done()}} >
                            <div><img className='modal-cancel-img' src={cancelBtnImage}  alt="cancel_button" /></div>
                            <div className='modal-cancel-text'>CANCEL</div>
                        </div>
                        <div 
                            className= {this.state.input ? 'modal-ok-btn-flex' : 'modal-ok-btn-flex element-disabled'} 
                            onClick={()=>{applyTransDiscount(this.state.input)}}
                        >
                            <div className='modal-ok-text'>OK</div>
                        </div>    
                    </div>  
                </div>
            </Modal2>    
        )
    }

    SffModal = () => {
        const {applyTransDiscount, done} = this.props;
        return (
            <Modal2   
                style={{
                    width:'100%',
                    height:'1298px',
                    top:'529px',
                    left:'0px',
                    background: 'white',
                }}
            >    
                <div className="modal-sff-flex">
                    <div className="modal-sff-title" style={{marginTop: '10px'}}>Trans Modify: Trans Discount</div> 
                    <input 
                        className="modal-sff-input" 
                        value={this.state.input}  style={{marginTop: "199px"}} type="text" placeholder="Enter % Off" 
                        onChange={(e)=> this.onNextCharInput(e.target.value)}
                    />
                    <div className="modal-sff-btn-container">
                        <div className='modal-sff-btn-cancel' style={{marginRight: "50px"}} onClick={()=>{done()}} >
                                <div><img className='modal-sff-cancel-img ' style={{marginRight: '20px', marginLeft: '10px'}} src={cancelBtnImage}  alt="cancel_button" /></div>
                                <div style={{marginRight: '10px'}}>CANCEL</div>
                        </div>
                        <div 
                            className= {this.state.input ? 'modal-sff-btn-ok' : 'modal-sff-btn-ok element-disabled'} 
                            onClick={()=>{applyTransDiscount(this.state.input)}}
                        >
                            <div>OK</div>
                        </div>
                    </div>
                </div>
            </Modal2>    
        )
    }

    onNextCharInput(input){
        if(this.isValidInput(input)){
            this.setState({input})
        }
        //need to allow backspace for last char;
        if(input == ''){
            this.setState({input})
        }

    }

    isValidInput(input){
        const discountThreshold = this.discountThreshold ? this.discountThreshold : 100;
        
        if(input/1 >= 1 && input/1 <= discountThreshold) {
            console.log('isvalid')
            return true
        }
        return false;
    }
}
