import React, { Component } from 'react';
import Modal from 'react-responsive-modal'; 

import closeIcon from '../../../../../resources/images/Text_Close.svg';

import './reasonsDidNotSwipe.css';

export default class ReasonsCardNotSwiped extends Component {

    constructor(props){
        super(props);

        //need to change optionsFromAPI from hardcoded to API response
        this.state = {
            optionSelected:'',
            optionsFromAPI:["Unreadable Card", "Not Present", "Shop W/O Card", "MSR Not Working"],
        }
    }


    handleSelection = (index, item) => {
        console.log("Selected:", item);

        if(this.state.optionSelected === index){
            this.setState({optionSelected: ''});
        }else{
            this.setState({optionSelected: item});
        }
    }

    render() {

        var selectedStyle = {
            background: "#4b2b6f",
            color : "#FFFFFF"
        }
        var unselectedStyle = {
            background: "#FFFFFF",
            color : "#000000"
        }


        return (
            <Modal
                open={this.props.props.didNotSwipe}
                classNames={{modal: 'reasonsDidNotSwipe-modal'}}
                little
                showCloseIcon={false}
                onClose={''}
                closeOnOverlayClick={false}
            >
                <div className="reasonsDidNotSwipe-title-Container">
                    <div className="reasonsDidNotSwipe-title-text">Select reason card not swiped</div>
                </div>
                <div className="reasonsDidNotSwipe-list-container"> 
                    <ul className="reasonsDidNotSwipe-list">
                        {this.state.optionsFromAPI.map(function(item,index) {
                            return  <li className="reasonsDidNotSwipe-list-container container-items" style={(this.state.optionSelected === item)?(selectedStyle):(unselectedStyle)} onClick={() =>{this.handleSelection(index, item)}} key={index}>{item}</li>
                        },this)}
                    </ul>
                </div>
                <div className="reasonsDidNotSwipe-button-container">
                    <button className="reasonsDidNotSwipe-button-cancelButton" onClick={this.props.props.handleCardSwiped}><img src={closeIcon} className="reasonsDidNotSwipe-button-closeIcon"></img>CANCEL</button>
                    <button className={this.state.optionSelected===""?"reasonsDidNotSwipe-button-acceptButton reasonsDidNotSwipe-disabled":"reasonsDidNotSwipe-button-acceptButton"} 
                    disabled={this.state.optionSelected===""?true:false}
                    onClick={() =>{
                        this.props.props.handleNotCardSwipedReason(this.state.optionSelected);
                        this.props.props.handleCardSwiped();
                        }}>OK</button>
                </div>
            </Modal>
        );
    }
}