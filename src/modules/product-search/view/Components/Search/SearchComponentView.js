import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import { elementstyle } from '../../UIElementStyle';


// Icons Import

import crossicon from '../../../../../resources/images/Clear_All_White.svg';
import searchbtnicon from '../../../../../resources/images/Search.svg';



export class SearchComponentView extends Component {

  render(){
        return(
            <div className='product-search-input-area-searchtab-content'>
                        <div className='product-search-input-area-section1'>
                            <div className='product-search-input-area-section1-row1 '>
                                <div className='product-search-input-area-section1-row1-title'>What are you looking for?</div>
                            </div>
                            <div className='product-search-input-area-section1-row2'>
                                <div class="radio" onClick={ (event) => this.props.productSearchProps.showRadioBtn1(event) } id="keyword_search">
                                    <input id="radio-11" name="radio" type="radio"  />
                                    <label for="radio-11" id="radio-1" class="radio-label">Keyword</label>
                                </div>
                                <div class="radio radio-wrapper2" onClick={ (event) => this.props.productSearchProps.showRadioBtn2(event) }  id="pimsku_search" >
                                    <input id="radio-12" name="radio" type="radio" />
                                    <label  for="radio-12" class="radio-label">PIM SKU</label>
                                </div>
                                <div class="radio radio-wrapper3" onClick={ (event) => this.props.productSearchProps.showRadioBtn3(event) } id="upc_search">
                                    <input id="radio-13" name="radio" type="radio" />
                                    <label  for="radio-13" class="radio-label">UPC</label>
                                </div>
                                <div class="radio radio-wrapper4" onClick={ (event) => this.props.productSearchProps.showRadioBtn4(event) } id="style_search">
                                    <input id="radio-14" name="radio" type="radio" />
                                    <label  for="radio-14" class="radio-label">Style</label>
                                </div>
                                <div class="radio radio-wrapper5" onClick={ (event) => this.props.productSearchProps.showRadioBtn5(event) } id="catalog_search">
                                    <input id="radio-15" name="radio" type="radio" />
                                    <label  for="radio-15" class="radio-label">Catalog/Item ID</label>
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
                                        onChange={this.props.productSearchProps.handleChange.bind(this, "search_keyword")}
                                        value={this.props.productSearchProps.searchFields["search_keyword"]}
                                        underlineStyle={elementstyle.underlineStyle}
                                        maxLength="50"
                                        onKeyDown={(event) => {
                                            event.keyCode === 13 && this.props.productSearchProps.handleApiInvoker()
                                            }
                                        }
                                        >
                                    </TextField>
                                </div>

                                  <div className='product-search-input-area-section1-row3-pimsku-search'>
                                    <TextField
                                        type="number"
                                        floatingLabelText="Enter PIM SKU"
                                        floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                                        style={elementstyle.textFieldStyle}
                                        fullWidth={true}
                                        inputStyle={elementstyle.textFieldInputStyle}
                                        refs="search_pimsku"
                                        onChange={this.props.productSearchProps.handleChange.bind(this, "search_pimsku")}
                                        value={this.props.productSearchProps.searchFields["search_pimsku"]}
                                        // onChange={this.handleTextFieldInput}
                                        // value={this.state.pimSKU}
                                        underlineStyle={elementstyle.underlineStyle}
                                        onKeyPress={(e) => {
                                            if(e.key === 'Enter') {
                                                e.preventDefault();
                                                this.props.productSearchProps.handleApiInvoker()
                                                }
                                                }}
                                        onInput = {(e) =>{
                                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                                                }}        
                                        >
                                    </TextField>
                                </div>


                                <div className='product-search-input-area-section1-row3-upc-search'>
                                    <TextField
                                        type="number"
                                        floatingLabelText="Enter UPC"
                                        floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                                        style={elementstyle.textFieldStyle}
                                        fullWidth={true}
                                        inputStyle={elementstyle.textFieldInputStyle}
                                        refs="search_upc"
                                        onChange={this.props.productSearchProps.handleChange.bind(this, "search_upc")}
                                        value={this.props.productSearchProps.searchFields["search_upc"]}
                                        underlineStyle={elementstyle.underlineStyle}
                                        onKeyDown={(event) => {
                                            event.keyCode === 13 && this.props.productSearchProps.handleApiInvoker()
                                            }
                                        }
                                        onInput = {(e) =>{
                                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                                            }} 
                                        >
                                    </TextField>
                                </div>

                                  <div className='product-search-input-area-section1-row3-style-search'>
                                    <TextField
                                        type="number"
                                        floatingLabelText="Enter Style"
                                        floatingLabelStyle={elementstyle.textFieldFloatingLabelStyle}
                                        style={elementstyle.textFieldStyle}
                                        fullWidth={true}
                                        inputStyle={elementstyle.textFieldInputStyle}
                                        refs="search_style"
                                        onChange={this.props.productSearchProps.handleChange.bind(this, "search_style")}
                                        value={this.props.productSearchProps.searchFields["search_style"]}
                                        underlineStyle={elementstyle.underlineStyle}
                                        onKeyDown={(event) => {
                                            event.keyCode === 13 && this.props.productSearchProps.handleApiInvoker()
                                            }
                                        }
                                        onInput = {(e) =>{
                                            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
                                            }} 
                                        >
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
                                            onChange={this.props.productSearchProps.handleChange.bind(this, "search_catid")}
                                            value={this.props.productSearchProps.searchFields["search_catid"]}
                                            underlineStyle={elementstyle.underlineStyle}
                                            onKeyDown={(event) => {
                                                event.keyCode === 13 && this.props.productSearchProps.handleApiInvoker()
                                                }
                                            }
                                            maxLength="5"
                                            >
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
                                                onChange={this.props.productSearchProps.handleChange.bind(this, "search_itemid")}
                                                value={this.props.productSearchProps.searchFields["search_itemid"]}
                                                underlineStyle={elementstyle.underlineStyle}
                                                onKeyDown={(event) => {
                                                    event.keyCode === 13 && this.props.productSearchProps.handleApiInvoker()
                                                    }
                                                }
                                                maxLength="5"
                                                >
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-search-input-area-section2'>
                            <div className='product-search-input-area-section2-btn product-search-input-area-clear-btn' onClick = {() => this.props.productSearchProps.clearAll(this)}>
                                <div className='product-search-input-area-btn-content'>
                                    <img src = {crossicon} className='product-search-input-area-btn-icon'/>
                                    <div className='product-search-input-area-btn-label'>CLEAR ALL</div>
                                </div>
                            </div>
                            <div className='product-search-input-area-section2-btn product-search-input-area-search-btn'>
                                <div className='product-search-input-area-btn-content'>
                                    <img src = {searchbtnicon} className='product-search-input-area-btn-icon'/>
                                    <div
                                       className='product-search-input-area-search-btn-label' onClick = {() => this.props.productSearchProps.handleApiInvoker()}
                                       >
                                        SEARCH
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>);
    }
}
