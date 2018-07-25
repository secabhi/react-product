import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

/* Import  styles */
import '../../Styles/AddCustomerStyle.css';
import {customStyle} from '../../Styles/AddCustomerComponentStyle'

/*Component import */
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import arrowdownicon from '../../../../../resources/images/Arrow_Down.svg';


export class Salutation extends Component {

    render() {
        const toCamelCase = (str) => {
            return str.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
                return match.charAt(match.length-1).toUpperCase();
            });
          }
      /*  var Dropdownicon = (props) => (

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
                <defs></defs>
                <path
                    id="Arrow_Down"
                    class="selectDropDownSvgIcon"
                    d="M.8,185.8l22.9,22.9,23.1-22.9"
                    transform="translate(-0.05 -185.05)"/>
            </svg>
        ); */
        return (
            <SelectField value={this.props.selectedSalutation} onChange={this.props.handleSalutationChange} 
                floatingLabelText="Sal..." fullWidth={true} floatingLabelStyle={customStyle.selectFieldFloatingLabelStyle} style={customStyle.selectFieldStyle} labelStyle={customStyle.selectFieldLabelStyle} menuItemStyle={customStyle.selectFieldMenuItemStyle} selectedMenuItemStyle={customStyle.selectFieldMenuItemStyle} iconStyle={customStyle.selectFieldIconStyle} //maxHeight = '85.5px'
                maxHeight={180} dropDownMenuProps={{
                iconButton: <img src={arrowdownicon} alt="arror-icon"/>
                }} underlineStyle={customStyle.underlineStyle}>
                {this.props.salutationDataDrop.map(function (item, i) {
                        return <MenuItem
                            className="select-field-menu-item"
                            key={i}
                            value={toCamelCase(item)}
                            primaryText={toCamelCase(item)}/>;
                    })
                }

            </SelectField>
            )
    }
}