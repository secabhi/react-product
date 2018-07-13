import React, { Component } from 'react';

import accordianOpen from '../../resources/images/Accordian_Open.svg';
import accordianClose from '../../resources/images/Accordian_Closed.svg';
import './dropDown.css';

export default class DropDown extends Component {
    state = {show: false};

    toggleChildrensVisibility() {
        this.setState((prevState)=> ({
            show: !prevState.show
        }))
    } 
    
  
  
    render(){
        const header = React.cloneElement(this.props.children[0], {...this.state})
        let active = !!this.props.active;
        
        return (
            <div className={active ? 'dropDown': 'dropdown-element-disabled'} >
                <div className="dropDown-main-flex" onClick={() => {console.log('Sweezey : dropdown: i was clicked');this.toggleChildrensVisibility() }}>
                    {header}
                    <img className="dropDown-icon" src={this.state.show ? accordianOpen : accordianClose} alt='dropdown arrow' />
                </div>
                <div className="dropDown-children" style={{display: (this.state.show ? 'unset' : 'none')}} >
                    {this.props.children[1]}
                </div>
            </div>  
        )     
    }

}