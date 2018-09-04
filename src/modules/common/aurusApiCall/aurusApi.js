import { json2xml } from '../../common/helpers/helpers';

const aurusVars = require("../../../resources/aurus/aurusVars.json");
const TransRequestJson = require("../../../resources/aurus/TransRequest_GiftCard.json");
const getCardBinJson = require("../../../resources/aurus/GetCardBINRequest.json");
const UpdateRequestScanJson = require("../../../resources/aurus/UpdateRequestScan.json");
const closeTransJson = require("../../../resources/aurus/CloseTran.json");
console.log("getCardBinJson", this.getCardBinJson);

// CALLING AURUS GETCARDBIN API AND ACTIVATING THE SWIPE
export function activateSwipGiftCard(){
  console.log("------> CALLING THE GET CARDBIN API FROM AURUS CENTERALIZED FOLDER------> 2400");
  getCardBinJson.GetCardBINRequest.POSID = aurusVars.POSID;
  getCardBinJson.GetCardBINRequest.APPID = aurusVars.APPID;
  getCardBinJson.GetCardBINRequest.CCTID = aurusVars.CCTID;
  getCardBinJson.GetCardBINRequest.LookUpFlag = aurusVars.LookUpFlag;
  getCardBinJson.GetCardBINRequest.AllowKeyedEntry = "N";
  getCardBinJson.GetCardBINRequest.CardNumber = "";
  var req = json2xml(getCardBinJson);
  return req;
}


export function aurusGetBalanceEnquiry(cardNumber){
        console.log("----->Card Number----->", cardNumber);
        console.log("------> HEY I AM IN AURUSAPI BALANCEENQUIRY FUNCTION---------> 27");
        TransRequestJson.TransRequest.CardNumber = cardNumber;
        TransRequestJson.TransRequest.CardToken =cardNumber; 
        TransRequestJson.TransRequest.EntrySource = 'K';
        TransRequestJson.TransRequest.TransAmountDetails.ServicesTotalAmount ="0.00";
        TransRequestJson.TransRequest.TransAmountDetails.ProductTotalAmount = "0.00";
        TransRequestJson.TransRequest.TransAmountDetails.TaxAmount ="0.00";
        TransRequestJson.TransRequest.TransAmountDetails.Discount = "0.00";
        TransRequestJson.TransRequest.TransAmountDetails.EBTAmount =" 0.00";
        TransRequestJson.TransRequest.TransAmountDetails.FSAAmount = "0.00";
        TransRequestJson.TransRequest.TransAmountDetails.DutyTotalAmount = "0.00";
        TransRequestJson.TransRequest.TransAmountDetails.FreightTotalAmount = "0.00";
        TransRequestJson.TransRequest.TransAmountDetails.AlternateTaxAmount =" 0.00";
        TransRequestJson.TransRequest.TransAmountDetails.TipAmount =" 0.00";
        TransRequestJson.TransRequest.TransAmountDetails.DonationAmount = "0.00";
        TransRequestJson.TransRequest.TransAmountDetails.TenderAmount = "0.00";
        //TransactionType must be 12 for balance enquiry
        TransRequestJson.TransRequest.TransactionType = 12;
        const params = json2xml(TransRequestJson);
        return params;
      
}
