import React, { Component } from 'react';
import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import './associateDiscount.css';
import './globalModalSff.css';

export class AssociateDiscountModalSFF extends Component  {
    constructor(props){
        super(props);
        this.state = {
            pin: '',
            id: '',
        }
    }

    onInputChange(e){
       let newState = {};
       newState[e.target.id] = e.target.value
       this.setState(newState);
    }

    shouldBeDisabled(){
        if(this.state.id.length >= 4 && this.state.pin >=4 ) {
            return false;
        }
    }
    render() {
        const {applyAssociateDiscount, done} = this.props;
        return (
            <div className="associateDiscount-sff">
                <div className="associateDiscount-title">Trans Modify: Associate Trans</div>
                <div className="modal-title" >Associate Trans</div>
                <div className={this.state.pin? 'associate-label asd-show-label':'associate-label asd-hide-label'} style={{marginTop: "80px"}} >Enter Associate Pin for Discount</div>
                <input 
                    className="associateDiscount-input"  
                    id='pin' style={{marginTop: "11px"}} 
                    value={this.state.pin}  
                    type="text" 
                    placeholder="Enter Associate Pin for Discount" 
                    onChange={(e) => this.onInputChange(e)}
                />
                <div className={this.state.id ? 'associate-label asd-show-label':'associate-label asd-hide-label'}  style={{marginTop: "80px"}} >Enter ID#</div>
                <input 
                    className="associateDiscount-input" 
                    id='id' style={{marginTop: "11px"}} 
                    value={this.state.id} 
                    type="text" 
                    placeholder="Enter ID#" 
                    onChange={(e) => this.onInputChange(e)}
                />
                <div className="asd-buttons-container" style={{marginTop: "100px"}} >
                    <div className='asd-cancel-btn-flex' style={{marginRight: "40px"}} onClick={()=>{done()}} >
                        <div><img className='asd-cancel-img' src={cancelBtnImage}  alt="cancel_button" /></div>
                        <div className='asd-cancel-text'>CANCEL</div>
                    </div>
                    <div 
                        className='asd-ok-btn-flex' 
                        onClick={()=>{applyAssociateDiscount(this.state.pin, this.state.id)}}
                        disabled={this.shouldBeDisabled()}
                    >
                        <div className='asd-ok-text'>OK</div>
                    </div>    
                </div>   
            </div>
        )
    }    
}