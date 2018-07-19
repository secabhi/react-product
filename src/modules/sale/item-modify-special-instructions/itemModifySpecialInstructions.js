import React, { Component } from 'react';
import { TextField } from 'material-ui';
import './itemModifySpecialInstructions.css'

import item_Modify from '../../../resources/images/Item_Modify_Black.svg';
import Cancel_Purple_SFF from '../../../resources/images/Cancel_Purple_SFF.svg';

export class ItemModifySpecialInstructions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            specialInstructions: '',
        }
        this.ItemModifySpecialInstructionsSubmit = this.ItemModifySpecialInstructionsSubmit.bind(this);
    }
    
    componentDidMount(){
        if(this.props.specialInstructionsValue !== null && this.props.specialInstructionsValue !== undefined && this.props.specialInstructionsValue!= '') {
            this.setState({specialInstructions : this.props.specialInstructionsValue});
        }
        else {
            this.updateModifySpecialInstructionsEntry({
                target : {
                    value : ''
                }
            }) 
        }
    }

    ItemModifySpecialInstructionsSubmit(e) {
        let StringFormating = this.state.specialInstructions.replace(/(?:\r\n|\r|\n)/g, " ")
        
        e.preventDefault();
        console.log('Special Instructions Update SUBMITING');
        this.props.itemModifySpecialInstructionsUpdate(StringFormating);
        this.props.showSpecialInstructionsModal(false); 
    }

    updateModifySpecialInstructionsEntry(e) {
        const { specialInstructions } = this.state;
        const { max_chars } = this.state;
        this.setState({ specialInstructions: e.target.value,
        });
        console.log("valueAt:"+e.target.value.charAt(0))
        if ((e.target.value.length < 1 )){
            document.getElementsByClassName("item-modify-special-instructions-ok")[0].disabled = true;
        }
        else {
            document.getElementsByClassName("item-modify-special-instructions-ok")[0].disabled =  false;
        }
    }
    render() {
        const textAreaStyle = {
            height: '300px',
            width: '620px',
            marginTop: (window.innerWidth > 1900) ? "30px" : "0px",
            marginLeft: (window.innerWidth > 1900) ? "52px" : "0px",
            border: '1px solid black'
        }

        const textFieldInputStyle = {
            padding:'25px',
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
            lineHeight: (window.innerWidth > 1900) ? "1.25" : '1.25',
            marginTop: (window.innerWidth > 1900) ? "0px" : "0px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",
            width:'93%'

        }
        const underlineStyle = {
            display: 'none'
        }



        return (
            <div className='item-modify-special-instructions-container'>
                <img src={item_Modify} className='item-modify-special-instructions-icon' />
                <div className='item-modify-special-instructions-label'>Special Instructions</div>
                <form className="ItemModifySpecialInstructionsForm" onSubmit={(e) => {
                    e.preventDefault();
                    this.ItemModifySpecialInstructionsSubmit(e) }}>
                    <TextField
                        required
                        type="text"
                        fullWidth={true}
                        style={textAreaStyle}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={underlineStyle}
                        placeholder="Enter Special Instructions"
                        multiLine={true}
                        maxLength="420"
                        rows={9}
                        rowsMax={9}
                        value={this.state.specialInstructions}
                        onChange={e => this.updateModifySpecialInstructionsEntry(e)}
                    />
                    <div className='special-instructions-maximum-characters'>
                        Maximum Character: 420
                    </div>
                    <div className="item-modify-special-instructions-cancel" onClick={() => this.props.showSpecialInstructionsModal(false)}>
                        <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                        <div className="item-modify-special-instructions-btn">CANCEL</div>
                    </div>
                    <button className="item-modify-special-instructions-ok" type="submit" disabled>OK</button>
                </form>
            </div>
        )
    }
};

export class ItemModifySpecialInstructionsSFF extends Component {
    constructor(props) {
        super(props)
        this.state = {
            specialInstructions: '',
            max_chars:'420',
            chars_left:'420'

        }
        this.ItemModifySpecialInstructionsSubmit = this.ItemModifySpecialInstructionsSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.specialInstructionsValue !== null && nextProps.specialInstructionsValue !== undefined && nextProps.specialInstructionsValue!= '') {
            this.setState({specialInstructions : nextProps.specialInstructionsValue});
        }
        else {
            this.updateModifySpecialInstructionsEntry({
                target : {
                    value : ''
                }
            }) 
        }
    }
    // componentDidMount(){
    //     if(this.props.specialInstructionsValue !== null && this.props.specialInstructionsValue !== undefined && this.props.specialInstructionsValue!= '') {
    //         this.setState({specialInstructions : this.props.specialInstructionsValue});
    //     }
    //     else {
    //         this.updateModifySpecialInstructionsEntry({
    //             target : {
    //                 value : ''
    //             }
    //         }) 
    //     }
    // }
    ItemModifySpecialInstructionsSubmit(e) {
        let StringFormating = this.state.specialInstructions.replace(/(?:\r\n|\r|\n)/g, " ")
        e.preventDefault();
        console.log('Special Instructions Update SUBMITING');
        this.props.itemModifySpecialInstructionsUpdate(StringFormating);
    }

    updateModifySpecialInstructionsEntry(e) {
        const { specialInstructions } = this.state;
        const { max_chars } = this.state;
        this.setState({ specialInstructions: e.target.value,
                        chars_left: max_chars - e.target.value.length
        })
        console.log("valueAt:"+e.target.value.charAt(0))
        if ((e.target.value.length < 1 ) || (e.target.value.charAt(0)==" ") || (e.target.value.charAt(0)=="\n")){
            document.getElementsByClassName("item-modify-special-instructions-ok-btn")[0].disabled = true;
        }
        else {
            document.getElementsByClassName("item-modify-special-instructions-ok-btn")[0].disabled =  false;
        }
    }
    render() {
        const textAreaStyle = {
            height: '300px',
            minHeight:'300px',
            width: '890px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px',
            paddingLeft: (window.innerWidth > 1900) ? '20px' : '20px',
            marginTop: (window.innerWidth > 1900) ? "57px" : "20px",
            marginLeft: (window.innerWidth > 1900) ? "40px" : "0px",
            border: '1px solid black'
        }

        const textFieldInputStyle = {
            height: '300px',
            minHeight:'300px',
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
            lineHeight: (window.innerWidth > 1900) ? "1.25" : '1.25',
            marginTop: (window.innerWidth > 1900) ? "0px" : "0px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",

        }
        const underlineStyle = {
            display: 'none'
        }



        return (
            <div className='item-modify-special-instructions-container'>
              <div className='item-modify-special-instructions-label'>Special Instructions</div>
              <form className="ItemModifySpecialInstructionsForm" onSubmit={(e) => { this.ItemModifySpecialInstructionsSubmit(e) }}>
                <TextField
                        id="sff-spl-instn-textfieldinputstyle"
                        required
                        type="text"
                        fullWidth={true}
                        style={textAreaStyle}
                        inputStyle={textFieldInputStyle}
                        underlineStyle={underlineStyle}
                        placeholder="Enter Special Instructions"
                        multiLine={true}
                        maxLength="420"
                        rows={9}
                        rowsMax={9}
                        value={this.state.specialInstructions}
                        onChange={e => this.updateModifySpecialInstructionsEntry(e)}
                    />
                <div className='special-instructions-maximum-characters'>
                        Maximum Character: 420
                </div>
                <div className="item-modify-special-instructions-buttons">
                <div className="item-modify-special-instructions-canceldiv" onClick={this.props.hideItemModifyModalSmallFF}>
                  <img src={Cancel_Purple_SFF} className="Cancel_Purple_SFF" />
                  <div className="item-modify-special-instructions-cancel-btn">CANCEL</div>
                </div>
                <button className="item-modify-special-instructions-ok-btn" type="submit" disabled>OK</button>
                </div>
              </form>
            </div>
        )
    }
};
