import { json2xml } from '../../common/helpers/helpers';
import call2Orders from './call2Orders';

const cardBinJson = require("../../../resources/aurus/GetCardBINRequest.json");
const aurusVars = require("../../../resources/aurus/aurusVars.json");

export default (lookup, entrySource, giftcardnum) => {
    console.log('In CardBin');
    cardBinJson.GetCardBINRequest.POSID = aurusVars.POSID;
    cardBinJson.GetCardBINRequest.APPID = aurusVars.APPID;
    cardBinJson.GetCardBINRequest.CCTID = aurusVars.CCTID;
    if (lookup) {
        cardBinJson.GetCardBINRequest.LookUpFlag = 0;
    }
    else {
        cardBinJson.GetCardBINRequest.LookUpFlag = aurusVars.LookUpFlag;
    }
    cardBinJson.GetCardBINRequest.AllowKeyedEntry = aurusVars.NotAllowedKeyedEntry;
    if (entrySource == 1) {
        cardBinJson.GetCardBINRequest.AllowKeyedEntry = aurusVars.AllowKeyedEntry;
        if (giftcardnum) {
            cardBinJson.GetCardBINRequest.CardNumber = giftcardnum;
        } 
    }
    const req = json2xml(this.getCardBinJson);
    return call2Orders(req)    
}



        //aurus Vars 
// {
//     "POSID": "005402",
//     "APPID": "402",
//     "CCTID": "402",
  
//     "LookUpFlag": "0",
//     "AllowKeyedEntry": "Y",
//     "NotAllowedKeyedEntry": "N",
//     "SignatureFlag": "Y",
  
//     "UpgradeType": "30",
//     "ClerkID": "03",
//     "ServerIP": "10.93.248.73",
//     "ServerPort": "15584"
  
  
//   }



 //getCardBinRequest
// {
//     "GetCardBINRequest": {
//       "POSID": "005402",
//       "APPID": "402",
//       "CCTID": "402",
//       "HeaderMessage": "Insert or Swipe Card",
//       "LookUpFlag": "0",
//       "AllowKeyedEntry": "N",
//       "AllowManualFallback": "Y",
//       "EntrySource": "B",
//       "CardNumber": "",
//       "KI": " ",
//       "KIType": " ",
//       "TenderAmount": " ",
//       "PromptConfirmFlag": "1",
//       "ProcessingMode": "0",
//       "CardDataInfo": {
//         "CardDataSource": "6",
//         "EncryptionMode": "1",
//         "TrackData": " ",
//         "EMVDetailsData": " "
//       },
//       "ECOMMInfo": {
//         "MerchantIdentifier": " ",
//         "StoreId": " ",
//         "TerminalId": " ",
//         "CVV": " ",
//         "CardIdentifier": " "
//       },
//       "CustomerInfoValidation": {
//         "ValidateEmail": " ",
//         "ValidatePhoneNum": " ",
//         "ValidateZipCode": " ",
//         "Reserved1": " ",
//         "Reserved2": " "
//       },
//       "ClerkID": " ",
//       "AdditionalTags": {
//         "Tags": {
//           "Tag": {
//             "Key": " ",
//             "Value": " "
//           }
//         }
//       }
//     }
//   }
  