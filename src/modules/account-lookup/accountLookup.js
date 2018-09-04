import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './accountLookup.css';
import AccountLookupHeader from './accountLookupHeader';
import AccountLookupMenu from './accountLookupMenu';
import CardData from './cardData';
import Modal from 'react-responsive-modal';
import { getAurusResponse} from '../payment/Controller/paymentActions'
import {json2xml,xml2json} from '../common/helpers/helpers';


import ConfrimDetailsModal from './modals/confrimDetailsModal'

import {itemSelectedAction} from '../common/cartRenderer/actions'
import Header from '../common/header/header'
import Footer from '../common/footer/footer'
import {startSpinner} from '../common/loading/spinnerAction'
import {storeCard,clearGetCards,setNextInquiry,isThirdParty,useStoredCard} from '../account-lookup/controllers/accountLookupActions'
var cardListObj = {};

class AccountLookup extends Component {
    aurusVars = null;
    getCardBinJson = null;
    constructor(props) {
        super(props);
        this.state = {
            selectedCardData:{
                kiNum:"",
                lastFour:"",
                chargeType:"",
                customerFname:"",
                customerLname:""
            },
            cards:{},
            salutation: this.props.customerDetails.salutation,
            firstname: this.props.customerDetails.firstName,
            lastname: this.props.customerDetails.lastName,
            currentLvl: this.props.incircleData ? ((this.props.incircleData.data.lyBenefitLevelCode > this.props.incircleData.data.tyBenefitlevelCode) ? this.props.incircleData.data.lyBenefitLevelCode : this.props.incircleData.data.tyBenefitlevelCode) : 0,
            address1: this.props.customerDetails.selectedAddress.Addr1,
            address2: this.props.customerDetails.selectedAddress.Addr2,
            city: this.props.customerDetails.selectedAddress.City,
            state: this.props.customerDetails.selectedAddress.State,
            zip: this.props.customerDetails.selectedAddress.Zip,
            confirmDetailsFlag:false,
            cardsAvailable:true,
        }
        this.aurusVars = require("../../resources/aurus/aurusVars")
        this.getCardBinJson = require("../../resources/aurus/GetCardBINRequest.json");
        this.bypassJson = require("../../resources/aurus/BypassScreen.json");
    }
    componentDidMount = () =>{
        console.log('next enquery'+JSON.stringify(this.props.cards.isNextInquiry));
        
      //  console.log(JSON.stringify(this.props.cards.data.cardList));
       if(this.props.cards.data.cardList==undefined || this.props.cards.data.cardList.length==0)
        {
            this.setState({cardsAvailable:false})
        }
       this.props.clearItemSelected("");
   
    }
    
    componentWillReceiveProps = (nextProps) =>{
        console.log('lookup props'+JSON.stringify(nextProps));
        if(nextProps.cards.data.cardList==undefined || this.props.cards.data.cardList.length==0)
        {
            this.setState({cardsAvailable:false})
        }

       
        if (nextProps.cards.dataFrom === "GET_CARDS_SUCCESS") {
            console.log('kim num'+nextProps.cards.data.cardList[0].kiNum);
            
            nextProps.cards.data.cardList?this.setState({cardsAvailable:true}):null;
        }
    }
    selectItem = (obj) =>{
        console.log('selecte item'+obj+JSON.stringify(obj));
        var cardDetails = {
            UseInTransAccount:{kiNum:obj.kiNum,
            lastFour:obj.lastFour,
            chargeType:obj.chargeType,
            customerFname:this.props.customerDetails.firstName,
            customerLname:this.props.customerDetails.lastName}
        }
        this.setState({selectedCardData:cardDetails});
    }
    storeCardData = (cardData) =>{
        /*var cardData = {
            kiNum:"",
            lastFour:"",
            chargeType:"",
            customerFname:"",
            customerLname:""
    };*/
    //debugger;
        //this.props.aurusActionInvoker(json2xml(this.bypassJson),'BYPASS');
        this.props.startSpinner(true);
        this.getCardBinJson.GetCardBINRequest.POSID = this.aurusVars.POSID;
        this.getCardBinJson.GetCardBINRequest.APPID = this.aurusVars.APPID;
        this.getCardBinJson.GetCardBINRequest.CCTID = this.aurusVars.CCTID;
        this.getCardBinJson.GetCardBINRequest.LookUpFlag = 2;
        this.getCardBinJson.GetCardBINRequest.AllowKeyedEntry = 'N';
        this.getCardBinJson.GetCardBINRequest.KI = this.state.selectedCardData.UseInTransAccount.kiNum;
        this.getCardBinJson.GetCardBINRequest.KIType = '12';
        if(this.state.selectedCardData.UseInTransAccount.chargeType === "VISA"  || this.state.selectedCardData.UseInTransAccount.chargeType === "MASTERCARD"){
            this.getCardBinJson.GetCardBINRequest.CardEntryMode = 'C';
        }
        var request = json2xml(this.getCardBinJson);
        console.log("PURNIMA : aurus request object account look up" + request);
        setTimeout(() => {this.props.aurusActionInvoker(request,"USE_IN_TRANS")},1000);
        // alert(JSON.stringify(this.state.selectedCardData))
        //this.props.storeCardDetails(this.state.selectedCardData);
        //this.props.lookupFlow()
        if(this.props.cards.path=='/payment')
        this.props.useStoredCardFlag(true);
        this.props.history.push(this.props.cards.path);
        this.props.startSpinner(false);

    }
    
   openconfirmdetails = () =>
   {
     this.setState({ confirmDetailsFlag: true });
   }

   closeconfirmdetails = () =>
   {
     this.setState({ confirmDetailsFlag: false });
   }
   nextInquiry = () =>{
    this.props.setNextInquiryFalg(true);
    this.props.history.push(this.props.cards.path);
   }
   exitLookup = () =>{
    //this.props.setNextInquiryFalg(true);
    this.props.history.push(this.props.cards.path);
   }

    render() {
        
        var cards = this.props.cards.data!=undefined?this.props.cards.data.cardList:'';
        cards = cards?cards:[{"kiNum":"","lastFour":"","chargeType":"","customerFname":"","customerLname":""}];
       // var address = this.props.customerDetails.selectedAddress;
        
        return (
            <div>
                <Header history={this.props.history}></Header>
                <AccountLookupHeader
                    pageName="Account Lookup"
                    custName="Ms. Barbara Jones"
                    firstName={this.state.firstname}
                    lastName={this.state.lastname}
                    currentLvl={this.state.currentLvl}
                    address1={this.state.address1}
                    address2={this.state.address2}
                    city={this.state.city}
                    state={this.state.state}
                    zip={this.state.zip}
                />
                <div className="lookup-content">
                    <div className="lookup-sidemenu">
                        <AccountLookupMenu 
                        isThirdParty = {this.props.cards.isThirdParty}
                        cardsAvailable = {this.state.cardsAvailable}
                        exitLookup = {this.exitLookup}
                        nextInquiry = {this.nextInquiry}
                        clientNumber = {this.props.customerDetails.clientNumber}
                        selectItem = {this.selectItem}
                        openconfirmdetails = {this.openconfirmdetails}
                        firstName={this.state.firstname}
                        lastName={this.state.lastname}
                        currentLvl={this.state.currentLvl}
                        address1={this.state.address1}
                        address2={this.state.address2}
                        city={this.state.city}
                        state={this.state.state}
                        zip={this.state.zip}
                        />
                    </div>
                    <div className="lookup-card-content">
                        <div className="Select-an-account-label">
                            <div className="Select-an-account-label-inside">Select an account</div>
                        </div>
                        {
                            cards?
                            cards.map((cardList, card) => {
                                
                                return <CardData selectItem={()=>this.selectItem(cardList)} cardList={cardList}/>
                            }):
                            ''
                        }
                    </div>

                </div>

                {this.state.confirmDetailsFlag?
            <Modal open={this.state.confirmDetailsFlag} 
            onClose={() => { }}
            showCloseIcon={false}
            little >
              <ConfrimDetailsModal
              selectedCard = {this.state.selectedCardData}
              storeCardData = {this.storeCardData}
              openconfirmdetails = {this.openconfirmdetails}
              closeconfirmdetails = {this.closeconfirmdetails}
              closeByPassModel={this.closeByPassModel}
              nextByPassModel={this.nextByPassModel}
              firstName={this.state.firstname}
              lastName={this.state.lastname}
              currentLvl={this.state.currentLvl}
              address1={this.state.address1}
              address2={this.state.address2}
              city={this.state.city}
              state={this.state.state}
              zip={this.state.zip}
              />
          </Modal>: null
          }
                <Footer></Footer>
            </div>
        );

        
    }


    
}

function mapStateToProps(state) {
    //console.log('@@@@@@@@@  Account Lookup **********', state)
    return {
        cards:state.Cards,
        customerDetails:state.customerDetails
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        startSpinner: startSpinner,
        storeCardDetails : storeCard,
        clearGetCardsInvoker:clearGetCards,
        setNextInquiryFalg:setNextInquiry,
        aurusActionInvoker : getAurusResponse,
        useStoredCardFlag:useStoredCard,
        clearItemSelected: (item) => dispatch(itemSelectedAction(item)),

      }, dispatch)
    }
export default connect(mapStateToProps,mapDispatchToProps)(AccountLookup)
