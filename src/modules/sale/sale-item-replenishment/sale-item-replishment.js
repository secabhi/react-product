import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './sale-item-replishment.css'
import clearallbtn from '../../../resources/images/Close_Bttn_Purple.svg';
import item_Modify from '../../../resources/images/Cancel_Purple_SFF.svg';
import Cancel_Purple_SFF from '../../../resources/images/Cancel_Purple_SFF.svg';
import info from '../../../resources/images/Item_Modify_Black.svg';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {updateReplishmentData,getReplenishment} from './sale-item-replishmentAction';

export class SaleItemReplenishment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values:{
                daysValue:'60',
                description : '',
                replenisherror:''
                
              },
              enableButton : false
        }
    }
    componentWillReceiveProps = nextProps => {
        if(window.innerWidth<1920){
            nextProps.showReplenishmentModal(false);
        }
        var udpatedValues = Object.assign({},this.state.values);
        if(nextProps.values.daysValue!=='')
        udpatedValues.daysValue=nextProps.values.daysValue;
        udpatedValues.description=nextProps.values.description;
        this.setState({values : udpatedValues})
    }

    componentWillMount() {
        this.props.getReplenishData();
        
    }
    componentDidMount(){
        document.getElementsByClassName('okbtn')[0].style.opacity="0.4";
    }

    handleqtyChange = (event,index,value) => {
        var value =event.target.value;
        var udpatedValues = Object.assign({},this.state.values);
        var replenisherror = ''
        udpatedValues.daysValue = value.trim();
        this.setState({values : udpatedValues});
        if((udpatedValues.daysValue).trim()==="" || parseInt(value)<15 || parseInt(value)>500){
            document.getElementById('okbtn').disabled= true;
            replenisherror = ' '
            document.getElementsByClassName('errorLabel')[0].style.display="block"
            document.getElementsByClassName('okbtn')[0].style.opacity="0.4";
            this.setState({enableButton : false,replenisherror: replenisherror})
        }
        else{
            document.getElementById('okbtn').disabled= false;
            replenisherror = ''
            document.getElementsByClassName('errorLabel')[0].style.display="none"
            document.getElementsByClassName('okbtn')[0].style.opacity="1";
            this.setState({enableButton : true,replenisherror: replenisherror})
        }
    } 
        
    updateDescription = (event,index,value) => {
        var value = event.target.value;
        var udpatedValues = Object.assign({},this.state.values);
        udpatedValues.description = value;
        this.setState({values : udpatedValues});
    }

    openReplenishmentModal = (event) => {
        if(window.innerWidth>1080){
        this.setState({replenishmentOpen:!this.state.replenishmentOpen})
        }
        else{
        this.handleChangedropdown.bind(this);
        document.getElementsByClassName('footer-container')[0].style.display="none";
        }
    
    } 
    
    updateReplenish = (event) => {
        var daysValue= this.state.values.daysValue;
        var description= this.state.values.description;
        this.props.updateReplenish(daysValue,description);
        this.props.showReplenishmentModal(false);
    } 

  
    
    render() {
        var textFieldStyle = {
            height: '40px',
            width:'95px',
            paddingTop: '0px'
        }
        var textAreaStyle = {
          height: '125px',
          width:'620px',
          paddingTop: '20px'
      }
        
        
        
        var textFieldFloatingLabelStyle = {
          height: '28px',
          fontSize: '30px',
          fontWeight: '300',
          fontFamily : 'Roboto',
          fontStyle: 'normal',
          fontStretch: 'normal',
          letterSpacing: '2px',
          lineHeight: '1.21',
          textAlign: 'left',
          color: '#828282'
      }
        var textFieldInputStyle = {
          height: '37px',
          fontFamily: 'Roboto',
          fontSize: '32px',
          lineHeight: '1.19',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontStretch: 'normal',
          letterSpacing: '2px',
          textAlign: 'left',
          color: '#505050',
          paddingBottom: '4.5px',
          paddingLeft:'13px',
          bottom: '8px',
          paddingTop:'0px'
      }
      var underlineStyle= {
        backgroundColor: '#828282',
        height:'0.8px'
    }
    var underlineStyleTextArea= {
        display:'none'
    }
    var errorsplitReplenishment = {
        bottom: '0',
        fontFamily: 'Roboto',
        fontSize: '26px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        letterSpacing: 'normal',
        textAlign: 'right',
        color: '#d53560'
    }
    
        return (
            <div >
           
                        <div className='replunishment-modal-lff'>
                        <div className="replunishment-container-lff">
                        <div className="image-holder-lff">
                          <img src={info}/>
                        </div>
                        <div className="replishment-text-lff">
                        Replenishment
                        </div>
                        <div className="replishment-dayssection-lff">
                        <TextField
                        type="text"
                        // pattern="[^+-.]"
                        // value={this.props.modified_amount_value.replace(/[0-9\.]+/, "")}
                        style = {textFieldStyle}
                        inputStyle = {textFieldInputStyle}
                        underlineStyle = {underlineStyle}
                       // value={this.state.daysValue}
                         value={this.state.values['daysValue'].replace(/[^0-9]+/ig, "") }
                        maxLength="3"
                        refs="daysValue"
                        errorText={this.state.replenisherror}
                        errorStyle={errorsplitReplenishment}
                       // onChange={e => this.handleqtyChange(e)}
                         onChange={this.handleqtyChange.bind(this)}
                        />
                        <div className="daystext-lff">days</div>
                        </div>
                      <div className="errorLabel" hidden>Entry should be between 15 and 500.</div>

                        <div className="replishment-textarea-lff">
                        <TextField
                         style = {textAreaStyle}
                         inputStyle = {textFieldInputStyle}
                         maxLength="42"
                         rows={2}
                         rowsMax={4}
                         underlineStyle={underlineStyleTextArea}
                         placeholder="Enter Description"
                         multiLine={true}
                         value={this.state.values['description']}
                         onChange={this.updateDescription.bind(this)}
                        />
                        </div>
                        <div className="info-section">
                        Maximum Characters: [42]
                        </div>
                        <div className="replishment-button-section-lff">
                        <button className="cancelbtn">
                        <img src={clearallbtn} className="cancelimg-replishment-lff"/>
                        <div className="canceltxt" onClick={() => {
                            this.props.showReplenishmentModal(false);
                        }}>CANCEL</div>
                        </button>
                        <div className="oktxt"  onClick={this.updateReplenish.bind(this)}>
                        <button id="okbtn" className="okbtn" disabled><span id="ok">OK</span></button>
                        </div>
                        </div>
                        </div>
                        </div>  
                        {/* <Modal open={true} classNames={{ modal: 'add-dom-cust-modal'}} little showCloseIcon='false' >
                        <div className='replenish-functionality-modal'>
                        <div className="alert-image"><img src={clearallbtn}/></div>
                           <div className="">Function only valid for client transaction.</div>
                        </div>  
                </Modal>  */}
            </div>
        )
    }
};

