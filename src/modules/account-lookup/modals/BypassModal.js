import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './accountlookupmodals.css';

import AccountLookupImg from '../../../resources/images/Account_Lookup.svg';
import cancelBtnImage from '../../../resources/images/Close_Bttn_Purple.svg';
import arrowdownicon from '../../../resources/images/Arrow_Down.svg';


class BypassModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const errorStyle = {
            bottom: '0',
            fontFamily: 'Roboto',
            fontSize: '26px',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#d53560',
            lineHeight: '20px !important'
        }
        const textFieldFloatingLabelStyle = {
            height: '28px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: (window.innerWidth > 1900) ? '1.19' : '1.19',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#333333',
        }

        const textFieldStyle = {
            height: '60px',
            width: '619.5px',
            maxWidth: '680px',
            paddingTop: (window.innerWidth > 1900) ? '22.2px' : '65px',
            paddingBottom: (window.innerWidth > 1900) ? '15px' : '20px'
        }

        const textFieldInputStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            // height: "18px",
            fontFamily: "Roboto",
            fontSize: (window.innerWidth > 1900) ? "30px" : "48px",
            fontWeight: "normal",
            fontStyle: "normal",
            fontStretch: "normal",
            lineHeight: (window.innerWidth > 1900) ? "1.13" : '1.18',
            letterSpacing: "normal",
            textAlign: "left",
            color: "#333333",
            paddingBottom: (window.innerWidth > 1900) ? "10px" : "10px",
            paddingLeft: (window.innerWidth > 1900) ? "0px" : "10px",
            fontSize: "24px"
        }

        var underlineStyle = {
            width: (window.innerWidth > 1900) ? "619.5px" : "738px",
            backgroundColor: '#333333',
        }
        const customStyle = {
            selectFieldLabelStyle: {
                height: '37px',
                fontFamily: 'Roboto',
                fontSize: '32px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                textAlign: 'left',
                color: '#828282',
                paddingLeft: '13px'
            },

            selectFieldMenuItemStyle: {
                height: '30px',
                fontFamily: 'Roboto-Medium',
                fontSize: '25px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: '1.19',
                letterSpacing: '2px',
                textAlign: 'left',
                color: '#505050'
            },

            selectFieldIconStyle: {
                fontSize: '40px'
            },

            textFieldFloatingLabelStyle: {
                height: '28px',
                fontFamily: 'Roboto',
                fontSize: '30px',
                fontWeight: '300',
                fontStyle: 'normal',
                fontStretch: 'normal',
                letterSpacing: 'normal',
                lineHeight: '1.21',
                textAlign: 'left',
                color: '#333333'
            },

            textFieldStyle: {

                color: '#828282'
            },

            textFieldInputStyle: {
                height: '37px',
                fontFamily: 'Roboto-Medium',
                fontSize: '32px',
                lineHeight: '1.19',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                letterSpacing: '2px',
                textAlign: 'left',
                color: '#505050',
                paddingLeft: '13px'
            },

            errorStyle: {
                paddingTop: '15px',
                height: '28px',
                fontFamily: 'Roboto',
                fontSize: '22px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: '1.21',
                letterSpacing: '2px',
                textAlign: 'right',
                color: '#d53560'
            },

            underlineStyle: {
                backgroundColor: '#828282'
            }
            ,

            selectFieldFloatingLabelStyle: {
                height: '28px',
                fontSize: '30px',
                fontWeight: '300',
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: '1.21',
                letterSpacing: 'normal',
                textAlign: 'left',
                color: '#333333'
            },

            selectFieldStyle: {

                color: '#505050 !important'
            }
        }
        const dropdownvalues = [{ "value": "Presale" }, { "value": "Known Client" }, { "value": "Unreadable DL" }];

        return (
            <div>

                <img src={AccountLookupImg} className='bypass-modal-image' />
                <div className="bypass-modal-bypass-label">Reason for Bypass</div>
                <div className="bypass-modal-dropdown">
                    <SelectField
                        dropDownMenuProps={{ iconButton: <img src={arrowdownicon} alt="arror-icon" /> }}
                        floatingLabelText="Select Reason"
                        fullWidth={true}
                        floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle}
                        style={customStyle.selectFieldStyle}
                        labelStyle={customStyle.selectFieldLabelStyle}
                        menuItemStyle={customStyle.selectFieldMenuItemStyle}
                        selectedMenuItemStyle={customStyle.selectFieldMenuItemStyle}
                        iconStyle={customStyle.selectFieldIconStyle} //maxHeight = '85.5px'
                        maxHeight={180}
                        underlineStyle={customStyle.underlineStyle}>
                        {dropdownvalues.
                            map(function (item, i) {
                                return
                                <MenuItem
                                    className="select-field-menu-item"
                                    key={i}
                                    value={item.value}
                                    primaryText={item.value}
                                />;
                            })
                        }

                    </SelectField>
                </div>

                <div className="bypass-modal-btn">
                    <div onClick={() => {this.props.closeByPassModel()}} className="bypass-modal-btn-cancel">
                        <div className="bypass-modal-btn-cancel-image">
                            <img src={cancelBtnImage} alt="cancel" />
                        </div>
                        <div className="bypass-modal-btn-cancel-label">CANCEL</div>
                    </div>
                    <div onClick={() => {this.props.nextByPassModel()}} className="bypass-modal-btn-next">
                        <div className="bypass-modal-btn-next-label">NEXT</div>
                    </div>
                </div>

            </div>
        );
    }
}
export default BypassModal