import React, { Component } from 'react';
import './customersearchsale.css';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-responsive-modal';


// Header and Footer
import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';


//Action Import
import { getCustomers, setCustomer } from './CustomerSearchAction';
import { startSpinner } from '../../common/loading/spinnerAction';

// Icons Import
import addcustomer from '../../../resources/images/Add_Customer.svg';
import isellcart from '../../../resources/images/Isell_Cart_Purple.svg'
import searchBtnIcon from '../../../resources/images/Search.svg';
import crossicon from '../../../resources/images/Cross_White.svg';
import accordianOpen from '../../../resources/images/Accordian_Open.svg';
import accordianClose from '../../../resources/images/Accordian_Closed.svg';
import warning from '../../../resources/images/Warning.svg';
import martkedTrangle from '../../../resources/images/Marked_Triangle_Purple.svg';

export class CustomerSearch extends Component {
    render() {

        const searchButton = <div className = 'customer-search-button-lff' onClick = {this.searchForCustomer}>
        <img src = {searchBtnIcon} className = 'customer-search-button-icon-lff'/>
        <span className = 'customer-search-button-label-lff'>SEARCH</span></div>

        var searchFieldStyle = {
            height: (window.innerWidth > 1900) ? '43px' : '63px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: 'normal',
            textAalign: 'left',
            color: '#ffffff'
        }

        var searchFieldEnteredTextStyle = {
            height: (window.innerWidth > 1900) ? '43px' : '63px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900) ? '32px' : '48px',
            fontHeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#ffffff'
        }

    return (
    <div className='customer-search-container'>
        <Header className="header-customer-search-lff" history={this.props.history} />

            <div className='customer-search-subheader'>

                <div className='customersearch-subheader-label-container'>
                    <span className='customersearch-subheader-label' onClick={() => this.displayCustomers()}>Customer Search</span>
                </div>

                <div className='customersearch-subheader-icons-container'>
                    <div className="customersearch-subheader-icon-container-frst-part">
                        <div onClick={() => this.openIsellcartScanner()}>
                            <img src={isellcart} className='customersearch-subheader-icon isellcart-icon'></img>
                        </div>
                        <div className="isellcart-label-lff">ISELL CART</div>
                    </div>

                    <div className="customersearch-subheader-icon-container-second-part" onClick={this.navigateToAddCustomer.bind(this)}>
                        <div>
                            <img src={addcustomer} className='customersearch-subheader-icon add-customer-icon button-disabler'></img>
                        </div>
                        <div className="add-customer-label-lff">ADD CUSTOMER</div>
                    </div>

                </div>
                
            </div> {/* CUSTOMER SEARCH HEADER */}

            <div className='customer-search-input-area'>

                <div className='customer-search-input-area-row1'>
                    <div className='customer-search-input-area-label-text'>Who are you looking for?</div>
                        {/*(window.innerWidth <= 1080 && this.props.customerSearch.buttonId == '1') ? 
                            ( 
                                <div className="skip-to-sale-sff" onClick={this.navigateToSale.bind(this)}>SKIP TO SALE</div>
                            ) : (null)
                        */}
                        {alert(window.innerWidth)(window.innerWidth <= 1080) ? 
                            ( 
                                <div className="skip-to-sale-sff" onClick={this.navigateToSale.bind(this)}>SKIP TO SALE</div>
                            ) : (null)
                        }
                    <div className="no-of-search-result-lff">Search Results for {this.state.searchItem}</div>
                    <div className="count-of-customers-lff">{this.state.searchResult.length} customers found</div>
                </div>

                <div className='customer-search-input-area-row2'>
                    <TextField 
                        className='search-field-style'
                        hintText="Search with last name, first name, phone or email"
                        id='searchitem'
                        type="text"
                        fullWidth = {true}
                        hintStyle={searchFieldStyle}
                        inputStyle={searchFieldEnteredTextStyle}
                        value={this.state.searchItem}
                        onFocus={this.showClearSearchIcon.bind('searchitem',this)}   
                        onFocusOut= {this.hideClearSearchIcon.bind('searchitem',this)}
                        //onBlur = {this.hideClearSearchIconOnBlur.bind('searchitem',this)}
                        onChange= {this.handleChange}                  
                    />

                    <img src={crossicon} className='customer-search-clear-input-icon' 
                        id='searchitem-clearinput-icon' style={{display:'none'}}
                        onClick={this.clearSearch.bind(this,'searchitem')}/> 
                    {(window.innerWidth > 1900) ? (   
                        <div>                          
                            <div className='customer-search-button-lff' onClick={this.searchForCustomer}>
                                <img  src={searchBtnIcon} className='customer-search-button-icon-lff'/>
                                <span className='customer-search-button-label-lff'>SEARCH</span>
                            </div>
                        </div>
                        ) : (null) 
                    }       
                </div>
                    
                <div className="customer-search-input-area-row-4-lff">
                    {(this.props.customerSearch.buttonId == '1') ? 
                        (
                        <div className='customer-search-input-area-skip-label-lff' onClick={this.navigateToSale.bind(this)}>SKIP TO SALE</div>
                        ) : (<span></span>)
                    }    
                </div>

                <div className='customer-search-input-area-row3'>
                    {(window.innerWidth> 1900) ? (null) :
                    (                            
                        <div className='customer-search-result-count-dispaly-area'>
                            <span className='customer-search-result-count-dispaly-label'>{this.state.searchResult.length} Results for “{this.state.searchItem}”</span>
                        </div>
                    )}
                    <div onClick={this.searchForCustomer} className='customer-search-button-sff'  ><img  src={searchBtnIcon} className='customer-search-button-icon'/>
                        <span className='customer-search-button-label'>SEARCH</span>
                    </div>
                </div>
            </div> {/* CUSTOMER SEARCH INPUT AREA */}

        {(this.state.searchResult.length > 0 ) ? 
            (<div>

                <div className='customer-search-result-display-container'>

                    <div className='customer-search-results-display-header'>
                        <div className='customer-search-result-display-header-title1'>NAME</div>
                        <div className='customer-search-result-display-header-title2'>PHONE NUMBER</div>
                        <div className='customer-search-result-display-header-title3'>E-MAIL</div>
                        <div className='customer-search-result-display-header-title4'>ADDRESS</div>
                        <div className='customer-search-result-display-header-title5'>CLIENT SMART ID</div>
                        <div className='customer-search-result-display-header-title6'></div>
                    </div>
                    
                    <div className='customer-search-results-display-area'>
                                {this.state.searchResult}
                    </div>

                </div>

            </div>) 

            :(this.state.searchResult.length === 0  || this.state.searchResult.length === null) ?
                (
                    <div>
                        <div className='customer-search-results-display-no-results'>
                            <span className='customer-search-results-display-no-results-label'>No results found</span>
                        </div>
                    </div>
                ) : null
        } 

        {(this.state.searchResult.length >= 50 ) ?
            (<Modal 
                classNames={{modal: 'customer-limit-modal'}} 
                open={this.state.maxLimit_modal} 
                onClose={() => this.setState({maxLimit_modal: false})} 
                closeOnOverlayClick = {false}
                >
                
                    <div className="customer-limit-modal-img">
                        <img src={warning}></img>
                    </div>
                    <div className="customer-limit-modal-msg"> A max limit of {this.state.searchResult.length} customers has returned. Please refine your search. </div>
                    <div className="customer-limit-modal-btn" onClick={() => this.setState({maxLimit_modal: false})}><span className="customer-limit-modal-txt">CLOSE</span></div>
                <div/>
            </Modal> 
        ) : null 
        } {/* CUSTOMER SEARCH RESULTS */}
            
        <Footer className="footer-customer-search-lff"/>
    </div> // CUSTOMER SEARCH CONTAINER
        
        );
    }
}


function mapStateToProps({ customerSearch }) {
    return { customerSearch }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
          getCustomers: getCustomers,
          setCustomer: setCustomer,
          startSpinner:startSpinner 
        }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);