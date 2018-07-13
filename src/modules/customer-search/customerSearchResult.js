import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';



//Header and Footer
import Header from '../common/header/header'
import Footer from '../common/footer/footer'

//
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { testAction } from './actions';
import './customerSearchResult.css';
import Modal from 'react-responsive-modal';


// Icons Import
import cardicon from '../../resources/images/Add_Card.svg';
//import clearallbtn from '../../resources/images/Cross_White.svg';
import accordianOpen from '../../resources/images/Accordian_Open.svg';
import searchIcon from '../../resources/images/Search_Purple.svg';
import martkedTrangle from '../../resources/images/Marked_Triangle_Purple.svg';
import accordianClose from '../../resources/images/Accordian_Closed.svg';
import savebtn from '../../resources/images/Save.svg';
import backarrow from '../../resources/images/Back.svg';
import addcustomer from '../../resources/images/Add_Customer.svg';
import addcustomerselected from '../../resources/images/Add_Customer_Selected.svg';
import addintcustomer from '../../resources/images/Add_International_Customer.svg';
import addintcustomerselected from '../../resources/images/Add_International_Customer_Selected.svg';
import incircleLevel3White from '../../resources/images/Incirle_Leve3_White.png'
import incircle from '../../resources/images/Incircle_Purple.svg'
import phonemodalicon from '../../resources/images/Confirm_Phone.svg';
import crossicon from '../../resources/images/Cross_White.svg';
import tickicon from '../../resources/images/Tick_White.svg';
import textopticon from '../../resources/images/Text_Opt_In.svg';
import emailmodalicon from '../../resources/images/Confirm_Email.svg';
import addcustsuccessicon from '../../resources/images/Success_Green.svg';
import erroricon from '../../resources/images/Error_Red.svg';
import editIcon from '../../resources/images/Edit_Profile.svg';
import searchBtnIcon from '../../resources/images/Search.svg';


class CustomerSearchResult extends Component {
    constructor(props){
        super(props);
        this.accordion = this.accordion.bind(this);
        this.state={
            isAccordion : true,
            Accordion:'',
            searchItem : '',    
            searchResult : []
        }
    }

    componentDidMount(){
        ( this.state.searchItem === '') ? (document.getElementsByClassName('customer-search-button-sff')[0].disabled) : ('')
        this.accordion();
    }

    showClearSearchIcon = (field, e) => {
        document.getElementById(e.target.id + '-clearinput-icon').style.display = 'block';
    }

    hideClearSearchIcon = (field, e) => {
        document.getElementById(e.target.id + '-clearinput-icon').style.display = 'none';
    }

    hideClearSearchIconOnBlur = (field, e) => {
        document.getElementById(e.target.id + '-clearinput-icon').style.display = 'none';        
    }

    handleChange = (event,index,value) => {  

        if(event.target.value == ""){
            if(window.innerWidth > 1900) {
                document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4";
                document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "none";
                document.getElementsByClassName('count-of-customers-lff')[0].style.display = "none";
            }
            else {
                document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "0.4";
                document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "none";
            }
			
        }
        else{
            if(window.innerWidth > 1900) {
                document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "1";
            } else {
                document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "1";
            }
        }
        
        this.setState({searchItem: event.target.value});   
    }

    clearSearch = (field, e) => 
        {this.setState({searchItem : '',searchResult :''});
        (window.innerWidth>1900) ? (document.getElementsByClassName('customer-search-button-lff')[0].style.opacity = "0.4" ,
        document.getElementsByClassName('customer-search-clear-input-icon')[0].style.display = "none",
        document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "none",
        document.getElementsByClassName('count-of-customers-lff')[0].style.display = "none") : 

        (document.getElementsByClassName('customer-search-button-sff')[0].style.opacity = "0.4" ,
        document.getElementsByClassName('customer-search-clear-input-icon')[0].style.display = "none" ,
        document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "none")
        
    }

    navigateToCustomerDetails = (data) => {
        console.log("data: ",data);
        if(data.country === 'US') {
            this.props.history.push('/customer-details');
        } else {
            this.props.history.push('/customer-details-international');
        }
    }


    searchForCustomer = () => {
        document.getElementsByClassName('customer-search-results-display-no-results-label')[0].style.display = "block";
        if(this.state.searchItem != '') {
            this.populateResults();
        }
    }
    
    accordion = () => {
        var trs = document.getElementsByClassName('accordionIcon');
        
    
        var acc = document.getElementsByClassName("accordionIcon");
        var i;
        for (i = 0; i < acc.length; i++) {
        var main = this;
          acc[i].addEventListener("click", function() {
            var id = this.getAttribute('data-id');
            this.closest(".custsearch-result.list-body").classList.toggle("active");
    
            var panels = document.getElementsByClassName('accordion-content');
            for(var i=0;i<panels.length;i++)
            {   
                if(panels[i].getAttribute('data-accordion-id')!=id)
                    panels[i].style.display = "none";
            }
    
            this.classList.toggle("active");
            var panel = document.getElementById('accordion-content'+id);
            if (panel.style.display === "flex") {
              panel.style.display = "none";
              main.setState({Accordion:id});
              main.setState({isAccordion: accordianClose});
              
            } else {
              panel.style.display = "flex";
              main.setState({Accordion:id});
              main.setState({isAccordion: accordianOpen});
    
            }
          });
        }
    }

    populateResults = () => {

        // dummy data to populate search result- will be removed
        var data = [
        {
            id:654321,
            fname:'Jhones',
            lname:'Andrea',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        },
        {
            id:654322,
            fname:'Jhones',
            lname:'Barbara',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'Canada',
            email:'abc@gmail.com',
            address:`32 Street, Thunder Bay, ON 60500`
        },
        {
            id:654323,
            fname:'Jhones',
            lname:'Ronda',
            country : 'US',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            email:'abc@gmail.com',
            address:`32 Any Street Anytown IL  00000`
        },
        {
            id:654324,
            fname:'Jhones',
            lname:'Robort',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        },  
        {
            id:654325,
            fname:'Jhones',
            lname:'Robort',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        },   
        {
            id:654326,
            fname:'Jhones',
            lname:'Robort',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        }, 
        {
            id:654327,
            fname:'Jhones',
            lname:'Robort',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        },  
        {
            id:654328,
            fname:'Jhones',
            lname:'Robort',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        },   {
            id:654329,
            fname:'Jhones',
            lname:'Robort',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        },   {
            id:654320,
            fname:'Jhones',
            lname:'Robort',
            salutation:'Mrs',
            phone:'(567) 393-6616',
            country : 'US',
            email:'abc@gmail.com',
            address:'32 Any Street Anytown IL  00000'
        }];

        var resultList =[];

        for(var i=0;i<data.length;i++){


            console.log('data'+ data.length);
            resultList.push(
                <div className='customer-search-result-panel' onClick={this.navigateToCustomerDetails.bind(this,data[i])}>
                <div className='customer-search-result-panel-content'>
                <div className='customer-search-result-panel-custname'>{data[i].lname},{data[i].fname} {data[i].salutation}.    </div>
                <div className="customer-search-result-panel-phone">{data[i].phone}</div>
                <div className="customer-search-result-panel-email">{data[i].email}</div>
                <div className="customer-search-result-panel-address">{data[i].address}</div>
                {/* <div className='customer-search-result-panel-custid'>{data[i].id}</div> */}
                <div className='customer-search-result-panel-accordion-btn'>
                        <img src={accordianClose}/>
                    </div>
                </div>
            </div>);
        }

        this.setState({searchResult: resultList});

        (window.innerWidth > 1900)?((document.getElementsByClassName('no-of-search-result-lff')[0].style.display = "block"),
            (document.getElementsByClassName('count-of-customers-lff')[0].style.display = "block"))
            :(document.getElementsByClassName('customer-search-result-count-dispaly-label')[0].style.display = "block")
    
       
    }

    render(){
        console.log(window.innerWidth);
        var searchFieldStyle = {
           
            height: (window.innerWidth > 1900)?'43px':'63px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900)?'32px':'48px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: 'normal',
            textAalign: 'left',
            color: '#ffffff'
        }
        var searchFieldEnteredTextStyle = {

            height: (window.innerWidth > 1900)?'43px':'63px',
            fontFamily: 'Roboto',
            fontSize: (window.innerWidth > 1900)?'32px':'48px',
            fontHeight: 'normal',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '1.31',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: '#ffffff'
        }


    
        return(
            <div className='customer-search-container'>
              <Header className="header-customer-search-lff" history={this.props.history}></Header>
              <div className="custsearch-res-sub-header">
     
            <div className="customer-name">
                <div className="customer-name-label">Customer Search </div>
            </div>

            <div className="add-customer">
                <img className="add-customer-icon" onClick={this.navigateToAddCustomer} src={addcustomer} alt="proceed-to-sale-icon" />
                <div className="add-customer-label" onClick={this.navigateToAddCustomer}>Add Customer</div>
            </div>
        </div>

                <div className='customer-search-input-area'>
                        <div className='customer-search-input-area-row1'>
                            <div className='customer-search-input-area-label-text'>
                                Who are you looking for?
                            </div>
                            <div className="no-of-search-result-lff">Search Results for {this.state.searchItem}</div>
                            <div className="count-of-customers-lff">{this.state.searchResult.length} customers found</div>
                        </div>
                    <div className='customer-search-input-area-row2'>
                        <TextField hintText="Search with last name, first name, phone and email"
                            id='searchitem'
                            type="text"
                            fullWidth = {true}
                            hintStyle={searchFieldStyle}
                            inputStyle={searchFieldEnteredTextStyle}
                            className='search-field-style'
                            value={this.state.searchItem}
                            onFocus={this.showClearSearchIcon.bind('searchitem',this)}   
                            onFocusOut= {this.hideClearSearchIcon.bind('searchitem',this)}
                            //onBlur = {this.hideClearSearchIconOnBlur.bind('searchitem',this)}
                            onChange= {this.handleChange}                  
                        />
                        <img src={crossicon} className='customer-search-clear-input-icon' 
                            id='searchitem-clearinput-icon' style={{display:'none'}}
                            onClick={this.clearSearch.bind(this,'searchitem')}/> 
                        
                        {
                            (window.innerWidth > 1900) ? (                                
                                <div className='customer-search-button-lff' onClick={this.searchForCustomer}>
                                    <img  src={searchBtnIcon} className='customer-search-button-icon-lff'/>
                                    <span className='customer-search-button-label-lff'>SEARCH</span>
                                </div>
                            ) :
                            (null) 
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
                </div>
               {
                    (this.state.searchResult.length > 0 ) ? 
                    (
                        <div>
                           
                            <div className='customer-search-result-display-container'>
                            <div className='customer-search-results-display-header'>
                            <div className='customer-search-result-display-header-title1'>NAME</div>
                            <div className='customer-search-result-display-header-title2'>PHONE NUMBER</div>
                            <div className='customer-search-result-display-header-title3'>E-MAIL</div>
                            <div className='customer-search-result-display-header-title4'>ADDRESS</div>
                            {/* <div className='customer-search-result-display-header-title5'>CUSTOMER ID</div> */}
                            </div>
                                <div className='customer-search-results-display-area'>
                                    {this.state.searchResult}
                                </div>
                            </div>
                        </div>
                    ) : 
                    (
                        <div>
                            <div className='customer-search-results-display-no-results'>
                                <span className='customer-search-results-display-no-results-label'>No results found</span>
                            </div>
                        </div>
                    )
                } 
                
                <Footer className="footer-customer-search-lff"></Footer>
            </div>);
            }

            navigateToAddCustomer = () => {
                this.props.history.push('/add-customer');
            }
            
}


function mapStateToProps({ customerSearchResult }) {
    return { customerSearchResult }
  }
  
function mapDispatchToProps(dispatch) {
    return { dispatch, testActionInvoker: () => dispatch(testAction()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearchResult);  