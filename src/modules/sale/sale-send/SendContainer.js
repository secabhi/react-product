import React, { Component } from 'react';

import Header from '../../common/header/header';
import SaleHeader from '../SaleHeader';
import ServicesHeader from '../sale-services/services-common/ServicesHeader';
import SendContent from './SendContent/SendContent';
import OptionSeven from './OptionSeven/OptionSeven';
import ServicesFooter from '../sale-services/services-common/ServicesFooter';
import Footer from '../../common/footer/footer';

import backArrow from '../../../resources/images/Back.svg';
import InsufficientQnty from './OptionSeven/OptionSevenModals';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class SendContainer extends Component {
    constructor(props) {
        super(props)
        this.inCircleInfo = require("../../../resources/stubs/cust-incircleinfo.json");
        this.inCircleDetails = require("../../../resources/stubs/incircleConfig.json");
        this.data = this.inCircleDetails.data;
        this.currentlvl = this.inCircleInfo.currentlvl;

        console.log("otherpagedata", this.props.otherPageData)

        this.state = {
            isSkip: this.props.otherPageData.isSkip,
            salutation: this.props.otherPageData.details ? this.props.otherPageData.details.salutation : '',
            firstname: this.props.otherPageData.details ? this.props.otherPageData.details.firstname : '',
            lastname: this.props.otherPageData.details ? this.props.otherPageData.details.lastname : '',
            address1: this.props.otherPageData.details ? this.props.otherPageData.details.address1 : '',
            address2: this.props.otherPageData.details ? this.props.otherPageData.details.address2 : '',
            mobile: this.props.otherPageData.mobile ? this.props.otherPageData.details.mobile : '',
            otherMobile: this.props.otherPageData.details ? this.props.otherPageData.details.otherMobile : '',
            zip: this.props.otherPageData.details ? this.props.otherPageData.details.zip : '',
            state: this.props.otherPageData.details ? this.props.otherPageData.details.state : '',
            city: this.props.otherPageData.details ? this.props.otherPageData.details.city : '',
            country: this.props.otherPageData.details ? this.props.otherPageData.details.country : '',
            email: this.props.otherPageData.details ? this.props.otherPageData.details.email : '',
            itemsArray: [],
            insufficientQunty:false,
            optionSeven: false,
            shippingOption: false,
            selectStore: false
        }
    }

    componentWillMount() {
        console.log("send container", this.state)
        // var cartItems = this.props.cart.data.cartItems.items;
        // var cartItemsArray = [];

        // cartItemsArray.push(
        // <CartRenderer
        //   items = {cartItems}
        //   currentItem = {this.props.currentItem}
        //   setCurrentItem = {this.setCurrentItem}
          // tax={}


        //   items = {this.props.items}
        // currentItem = {this.props.currentItem}
        // tax = {this.props.tax}
        // showItemGiftReceiptModal = {this.props.showItemGiftReceiptModal}
        // setCurrentItem = {this.props.setCurrentItem}
        // />
        // )
    //   this.setState({
    //     itemsArray: cartItemsArray
    //   })
    }

    initializeOptionSeven = (value) => {
        this.state.optionSeven = value
        this.setState({
          optionSeven: value
        })
        console.log('working container', value)
        return value;
        // return this.state.optionSeven;
      }

    setShippingOption = (value) => {
        // this.state.shippingOption = value
        this.setState({
          shippingOption: "shippingOption",
        //   optionSeven: false
        })
        // return value;
        // console.log('working', value)
    }

    // setSelectStore = (value) => {
    //     this.state.selectStore = value
    //     this.setState({
    //       selectStore: value
    //     })
    //     return value;
    //     // console.log('working', value)
    // }

    navigateToSale = () => {
        this.props.history.push('/sale')
    }

    QntyPopup = () => {
       this.setState({
        insufficientQunty:true
       });
    }

    exitModals = () => {
        this.setState({
            insufficientQunty: false,
            //selectStore: true
        })
    }

    footerButtonChange = () => {
        var displayButton;

        if(this.state.optionSeven === false && this.state.shippingOption === false) {
            displayButton = (
                <div className="giftwrap-next" 
                    onClick={this.QntyPopup}>
                <span className="giftwrap-next-text">Next</span></div>
                )
        }

        else if(this.state.optionSeven === "optionSeven") {
            console.log('optionseven button', this.state)
            displayButton = (
            <div className="giftwrap-next" 
                onClick={() => {this.setShippingOption()}}>
            <span className="giftwrap-next-text">Next</span></div>
            )
        }

        else if (this.state.shippingOption === "shippingOption") {
            console.log('shippinoption button', this.state)
            this.setState({
                optionSeven: false
            })
            displayButton = (
            <div className="giftwrap-next" 
                onClick={() => {this.navigateToSale()}}>
            <span className="giftwrap-next-text">OK</span></div>
            )
        }

        // else {
        //     this.setState({
        //         optionSeven: false,
        //         shippingOption: false
        //     })
        //     displayButton = (
        //         <div className="giftwrap-next" 
        //             onClick={this.QntyPopup}>
        //         <span className="giftwrap-next-text">OK</span></div>
        //         )
        // }

        return displayButton;
    }


    render() {
        console.log('PROP VALUES',this.props)
        console.log('STATE VALUES', this.state)
        // const optionSevenNext = (
            // <div className="giftwrap-next" 
            //     onClick={this.QntyPopup}>
            // <span className="giftwrap-next-text">Next</span></div>
        // )

        return (
        <div>
        
        <Header history={this.props.history} sale="true"/>

        <SaleHeader 
          pageName="Sale"
          salutation={this.state.salutation}
          firstName={this.state.firstname}
          lastName={this.state.lastname}
          currentLvl={this.currentlvl}
          skipCustomerInfo={this.state.isSkip}
          address1={this.state.address1}
          address2={this.state.address2}
        />

        
        <ServicesHeader>
            <div className="giftwrap-header-container">
                <img className="giftwrap-header-arrow" src={backArrow} alt="backarrow" onClick={this.navigateToSale}/>
                <div className="giftwrap-header-divider"></div>
                <div className="giftwrap-header-text">Send</div>
          </div>
        </ServicesHeader>


         <SendContent 
            history={this.props.history}
            items = {this.props.cart.data.cartItems.items}
            optionSevenState={this.state.optionSeven}
            selectStoreState={this.state.selectStore}
            shippingOptionState={this.state.shippingOption}
            initializeOptionSeven = {(value) => {this.initializeOptionSeven(value)}}
            selectStore = {(value) => {this.setSelectStore(value)}}
            shippingOption = {(value) => {this.setShippingOption(value)}}
            currentLvl={this.currentlvl}
            skipCustomerInfo={this.state.isSkip}
            salutation={this.state.salutation}
            firstName={this.state.firstname}
            lastName={this.state.lastname}
            address1={this.state.address1}
            address2={this.state.address2}
            mobile={this.state.mobile}
            otherMobile={this.state.otherMobile}
            city={this.state.city}
            state={this.state.state}
            email={this.state.email}
            country={this.state.country}
            zip={this.state.zip}
            initialComponent={this.props.initialComponent}
            /> 
        
        {/*<OptionSeven navigate={this.navigateToSale}/>*/}

        <ServicesFooter >
            <div className="giftwrap-cancel" onClick={this.navigateToSale}><span className="giftwrap-cancel-text">Cancel</span></div>
            {this.footerButtonChange()}
        </ServicesFooter>

        <Footer />
        <div className="select-store-container">
                <Modal classNames={{modal: "insufficientQunty"}} open={this.state.insufficientQunty} onClose={() => this.setState({insufficientQunty: false})} closeOnOverlayClick={false}>
                    <InsufficientQnty 
                    navigate={this.props.navigate} 
                    closeModal={this.exitModals} 
                    /> 
                </Modal>
        </div>  
        </div>
        )
    }
};


function mapStateToProps({cart, sale}) {
    return { cart,
             otherPageData: sale.otherPageData,
             initialComponent: sale.sendComponent
            }
  }
  
//   function mapDispatchToProps(dispatch) {
//     // return bindActionCreators(
//     //     {
//     //      FUTURE ACTIONS
//     //     }, dispatch)
//   }
  
export default connect(mapStateToProps)(SendContainer);