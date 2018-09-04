import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import { elementstyle } from '../../UIElementStyle';

import crossicon from '../../../../../resources/images/Clear_All_White.svg';
import searchbtnicon from '../../../../../resources/images/Search.svg';


export class BrowseComponentView extends Component {
    render(){
        var Dropdownicon = (props) => (

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 24.4">
                <defs></defs>
                <path
                    id="Arrow_Down"
                    class="selectDropDownSvgIcon"
                    d="M.8,185.8l22.9,22.9,23.1-22.9"
                    transform="translate(-0.05 -185.05)"/>
            </svg>
        );
        return(
            <div className='product-search-input-area-searchtab-content'>
                <div className='product-search-input-area-section1'>
                    <div className='product-search-input-area-section1-row1 '>
                        <div className='product-search-input-area-section1-row1-title'>Browse by Categories</div>
                    </div>
                <div className='product-search-input-area-section1-row2'>
                    <div className='product-search-row'>
                        <div className='product-search-col field1'>
                            <SelectField
                                id={'ddlCategoryList'}
                                value={this.props.productBrowseprops.selectedCategory}
                                onChange={this.props.productBrowseprops.handleCategoryChange}
                                floatingLabelText="Select Category"
                                fullWidth={false}
                                floatingLabelStyle={elementstyle.selectFieldFloatingLabelStyle}
                                style={elementstyle.selectFieldStyle}
                                labelStyle={elementstyle.selectFieldLabelStyle}
                                menuItemStyle={elementstyle.selectFieldMenuItemStyle}
                                selectedMenuItemStyle={elementstyle.selectedFieldMenuItemStyle}
                                iconStyle={elementstyle.selectFieldIconStyle}
                                maxHeight={180}
                                dropDownMenuProps={{
                                    iconButton: <Dropdownicon />,
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    }
                                }}
                                underlineStyle={elementstyle.underlineStyle}>
                                    <MenuItem className="select-field-menu-item" key={'cat_1'} value={"Designers"} primaryText="Designers" />
                                    <MenuItem className="select-field-menu-item" key={'cat_2'} value={"Women's Clothing"} primaryText="Women's Clothing" />
                                    <MenuItem className="select-field-menu-item" key={'cat_3'} value={"Cusp"} primaryText="Cusp" />
                                    <MenuItem className="select-field-menu-item" key={'cat_4'} value={"Shoes"} primaryText="Shoes" />
                                    <MenuItem className="select-field-menu-item" key={'cat_5'} value={"Handbags"} primaryText="Handbags" />
                                    <MenuItem className="select-field-menu-item" key={'cat_6'} value={"Beauty"} primaryText="Beauty" />
                            </SelectField>
                        </div>
                            {/*<div className={this.props.selectedCategory === '' ? 'product-search-col field2 disabledDropDown' : 'product-search-col field2'}>*/}
                        <div className='product-search-col field2'>
                            <SelectField
                                id={'ddlSubCategoryList'}
                                value={this.props.productBrowseprops.selectedSubCategory}
                                onChange={this.props.productBrowseprops.handleSubCategoryChange}
                                floatingLabelText="Select Sub Category"
                                fullWidth={false}
                                floatingLabelStyle={elementstyle.selectFieldFloatingLabelStyle}
                                style={elementstyle.selectFieldStyle}
                                labelStyle={elementstyle.selectFieldLabelStyle}
                                menuItemStyle={elementstyle.selectFieldMenuItemStyle}
                                selectedMenuItemStyle={elementstyle.selectedFieldMenuItemStyle}
                                iconStyle={elementstyle.selectFieldIconStyle}
                                //disabled={this.props.selectedCategory === ''}
                                maxHeight={180}
                                dropDownMenuProps={{
                                    iconButton: <Dropdownicon />,
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    }
                                }}
                                underlineStyle={elementstyle.underlineStyle}>
                                    <MenuItem className="select-field-menu-item" key={'subCat_1'} value={"Designers"} primaryText="Designers" />
                                    <MenuItem className="select-field-menu-item" key={'subCat_2'} value={"Women's Clothing"} primaryText="Women's Clothing" />
                                    <MenuItem className="select-field-menu-item" key={'subCat_3'} value={"Cusp"} primaryText="Cusp" />
                                    <MenuItem className="select-field-menu-item" key={'subCat_4'} value={"Shoes"} primaryText="Shoes" />
                                    <MenuItem className="select-field-menu-item" key={'subCat_5'} value={"Handbags"} primaryText="Handbags" />
                                    <MenuItem className="select-field-menu-item" key={'subCat_6'} value={"Beauty"} primaryText="Beauty" />
                            </SelectField>
                        </div>
                        {/*<div className={this.props.selectedCategory === '' ? 'product-search-col field3 disabledDropDown' : 'product-search-col field3'}>*/}
                        <div className='product-search-col field3'>
                            <SelectField
                                    id={'ddlDetailList'}
                                    value={this.props.productBrowseprops.selectedDetail}
                                    onChange={this.props.productBrowseprops.handleDetailChange}
                                    floatingLabelText="Select Detail"
                                    fullWidth={false}
                                    floatingLabelStyle={elementstyle.selectFieldFloatingLabelStyle}
                                    style={elementstyle.selectFieldStyle}
                                    labelStyle={elementstyle.selectFieldLabelStyle}
                                    menuItemStyle={elementstyle.selectFieldMenuItemStyle}
                                    selectedMenuItemStyle={elementstyle.selectedFieldMenuItemStyle}
                                    iconStyle={elementstyle.selectFieldIconStyle}
                                    //disabled={this.props.selectedCategory === ''}
                                    maxHeight={180}
                                    dropDownMenuProps={{
                                        iconButton: <Dropdownicon />,
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        }
                                    }}
                                    underlineStyle={elementstyle.underlineStyle}>
                                        <MenuItem className="select-field-menu-item" key={'det_1'} value={"Designers"} primaryText="Designers" />
                                        <MenuItem className="select-field-menu-item" key={'det_2'} value={"Women's Clothing"} primaryText="Women's Clothing" />
                                        <MenuItem className="select-field-menu-item" key={'det_3'} value={"Cusp"} primaryText="Cusp" />
                                        <MenuItem className="select-field-menu-item" key={'det_4'} value={"Shoes"} primaryText="Shoes" />
                                        <MenuItem className="select-field-menu-item" key={'det_5'} value={"Handbags"} primaryText="Handbags" />
                                        <MenuItem className="select-field-menu-item" key={'det_6'} value={"Beauty"} primaryText="Beauty" />
                            </SelectField>
                        </div>
                    </div>
                </div>
                <div className='product-search-input-area-section1-row3'>
                    <div className='product-search-input-area-section1-row3-keyword-search'>
                        <TextField
                            type="text"
                            floatingLabelText="Enter keyword"
                            floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                            style={elementstyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={elementstyle.textFieldInputStyle}
                            refs="search_keyword"
                            //onChange={this.handleChange.bind(this, "cust_fname")}
                            //value={this.props.fields["cust_fname"]}
                            underlineStyle={elementstyle.underlineStyle}>
                        </TextField>
                    </div>
                    <div className='product-search-input-area-section1-row3-pimsku-search'>
                        <TextField
                            type="text"
                            floatingLabelText="Enter PIM SKU"
                            floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                            style={elementstyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={elementstyle.textFieldInputStyle}
                            refs="search_pimsku"
                            //onChange={this.handleChange.bind(this, "cust_fname")}
                            //value={this.props.fields["cust_fname"]}
                            underlineStyle={elementstyle.underlineStyle}>
                        </TextField>
                    </div>
                    <div className='product-search-input-area-section1-row3-upc-search'>
                        <TextField
                            type="text"
                            floatingLabelText="Enter UPC"
                            floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                            style={elementstyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={elementstyle.textFieldInputStyle}
                            refs="search_upc"
                            //onChange={this.handleChange.bind(this, "cust_fname")}
                            //value={this.props.fields["cust_fname"]}
                            underlineStyle={elementstyle.underlineStyle}>
                        </TextField>
                    </div>
                    <div className='product-search-input-area-section1-row3-style-search'>
                        <TextField
                            type="text"
                            floatingLabelText="Enter Style"
                            floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                            style={elementstyle.textFieldStyle}
                            fullWidth={true}
                            inputStyle={elementstyle.textFieldInputStyle}
                            refs="search_style"
                            //onChange={this.handleChange.bind(this, "cust_fname")}
                            //value={this.props.fields["cust_fname"]}
                            underlineStyle={elementstyle.underlineStyle}>
                        </TextField>
                    </div>
                    <div className='product-search-input-area-section1-row3-itemid-search'>
                        <div className='product-search-input-area-section1-row3-itemid-search-field1'>
                            <TextField
                                type="text"
                                floatingLabelText="Catalog ID"
                                floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                                style={elementstyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={elementstyle.textFieldInputStyle}
                                refs="search_catid"
                                //onChange={this.handleChange.bind(this, "cust_fname")}
                                //value={this.props.fields["cust_fname"]}
                                underlineStyle={elementstyle.underlineStyle}>
                            </TextField>
                        </div>
                        <div className='product-search-input-area-section1-row3-itemid-search-field2'>
                            <TextField
                                type="text"
                                floatingLabelText="Item ID"
                                floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                                style={elementstyle.textFieldStyle}
                                fullWidth={true}
                                inputStyle={elementstyle.textFieldInputStyle}
                                refs="search_itemid"
                                //onChange={this.handleChange.bind(this, "cust_fname")}
                                //value={this.props.fields["cust_fname"]}
                                underlineStyle={elementstyle.underlineStyle}>
                            </TextField>
                        </div>
                    </div>
                </div>
            </div>
           <div className='product-search-input-area-section2'>
               <div className={(this.props.productBrowseprops.selectedCategory && this.props.productBrowseprops.selectedSubCategory && this.props.productBrowseprops.selectedDetail) ? 'product-search-input-area-section2-btn product-search-input-area-clear-btn' : 'product-search-input-area-section2-btn product-search-input-area-clear-btn productClearDisabled'}>
                   <div onClick={this.props.productBrowseprops.resetProductSearch} className={(this.props.productBrowseprops.selectedCategory && this.props.productBrowseprops.selectedSubCategory && this.props.productBrowseprops.selectedDetail) ? 'product-search-input-area-btn-content' : 'product-search-input-area-btn-content productClearDisabled'}>
                       <img src={crossicon} className='product-search-input-area-btn-icon' />
                       <div className='product-search-input-area-btn-label'>CLEAR ALL</div>
                   </div>
               </div>
               <div className={(this.props.productBrowseprops.selectedCategory && this.props.productBrowseprops.selectedSubCategory && this.props.productBrowseprops.selectedDetail) ? 'product-search-input-area-section2-btn product-search-input-area-search-btn' : 'product-search-input-area-section2-btn product-search-input-area-search-btn productSearchDisabled'}>
                   <div onClick={this.props.productBrowseprops.clickProductSearch} className={(this.props.productBrowseprops.selectedCategory && this.props.productBrowseprops.selectedSubCategory && this.props.productBrowseprops.selectedDetail) ? 'product-search-input-area-btn-content' : 'product-search-input-area-btn-content productSearchDisabled'}>
                       <img src={searchbtnicon} className='product-search-input-area-btn-icon' />
                       <div className='product-search-input-area-search-btn-label'>SEARCH</div>
                   </div>
               </div>
           </div>
       </div>);   
    }
}