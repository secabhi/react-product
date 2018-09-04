import { json2xml } from '../../common/helpers/helpers';
import call2Orders from './call2Orders';

const TransRequestJson = require("../../../resources/aurus/TransRequest.json");

export default (total, ticket) => {

	//write over Json object with new params for void
	TransRequestJson.TransRequest.KI = "";
	TransRequestJson.TransRequest.KIType = "";
	TransRequestJson.TransRequest.CardType = "";
	TransRequestJson.TransRequest.CardToken = "";
	TransRequestJson.TransRequest.POSIP = "";
    TransRequestJson.POSClientName = "",
	TransRequestJson.TransRequest.TransAmountDetails.TransactionTotal = total;
	TransRequestJson.TransRequest.TransactionType = "06"
	TransRequestJson.TransRequest.OrigAurusPayTicketNum = ticket;
	
	//convert to xml
	const xmlVoidRequest = json2xml(TransRequestJson);
	console.log('xml Void REQUEST', xmlVoidRequest);

	//make async orders call and return
	return call2Orders(xmlVoidRequest)
}





// {
//     "POSID": "01",
//     "APPID": "04",
//     "CCTID": "06",
//     "KI": " ",
//     "KIType": " ",
//     "DeviceId": " ",
//     "CardToken": " ",
//     "ProcessorToken": " ",
//     "CardExpiryDate": " ",
//     "CustomerIdentifier": " ",
//     "CardPresent": "Y",
//     "PurchaserPresent": "Y",
//     "EntrySource": " ",
//     "KeyedEntryAVSFlag": "N",
//     "KeyedEntryReasonCode": " ",
//     "GiftPurchaseAuthIndicator": "N",
//     "EcommerceIndicator": "N",
//     "EnableNFCReader": "N",
//     "CashBackFlag": " ",
//     "CVBFlag": " ",
//     "ProcessingMode": " ",
//     "ProcessCardFlag": " ",
//     "CardType": " ",
//     "CardDataInfo": {
//       "CardDataSource": "6",
//       "EncryptionMode": "1",
//       "TrackData": " ",
//       "EMVDetailsData": " ",
//       "CVVData": " ",
//       "PINBlock": " ",
//       "KSNBlock": " "
//     },
//     "TransAmountDetails": {
//       "ServicesTotalAmount": "0.00",
//       "ProductTotalAmount": "0.00",
//       "TaxAmount": "0.00",
//       "Discount": "0.00",
//       "EBTAmount": " ",
//       "FSAAmount": " ",
//       "DutyTotalAmount": " ",
//       "FreightTotalAmount": " ",
//       "AlternateTaxAmount": " ",
//       "TipAmount": "0.00",
//       "DonationAmount": "0.00",
//       "TenderAmount": " ",
//       "TransactionTotal": "5.01"
//     },
//     "ECOMMInfo": {
//       "MerchantIdentifier": " ",
//       "StoreId": " ",
//       "TerminalId": " ",
//       "CVV": " ",
//       "OneOrderToken": " ",
//       "OneTimeToken": " ",
//       "CardIdentifier": " ",
//       "CardExpiryDate": " ",
//       "DomainId": "1",
//       "TemplateId": "1",
//       "URLType": "1"
//     },
//     "GiftCardList": {
//       "GiftCard": {
//         "GiftCardNumber": " ",
//         "Track2Data": " ",
//         "Amount": " ",
//         "CardActivationDate": " ",
//         "CardExpirationDate": " "
//       }
//     },
//     "CardNumber": " ",
//     "TransactionType": "1",
//     "InvoiceNumber": " ",
//     "ReceiptNumber": " ",
//     "ReferenceNumber": " ",
//     "PONumber": " ",
//     "PODate": " ",
//     "TaxExemptFlag": " ",
//     "POSIP": "10.93.248.223",
//     "POSClientName": "MPOS-DEV10",
//     "POSVersion": " ",
//     "CustomerCode": " ",
//     "CustomerFirstName": " ",
//     "CustomerLastName": " ",
//     "WalletIdentifier": " ",
//     "DLIntellicheckFlag": " ",
//     "LanguageIndicator": " ",
//     "ProgramId": " ",
//     "StoreCardFlag": "0",
//     "PostAuthSequenceNo": "01",
//     "PostAuthCount": "01",
//     "BillingAddress": {
//       "BillingFirstName": " ",
//       "BillingMiddleName": " ",
//       "BillingLastName": " ",
//       "BillingAddressLine1": " ",
//       "BillingAddressLine2": " ",
//       "BillingAddressLine3": " ",
//       "BillingZip": " ",
//       "BillingCity": " ",
//       "BillingState": " ",
//       "BillingProvince": " ",
//       "BillingCountry": " ",
//       "BillingMobileNumber": " ",
//       "BillingOtherNumber": " ",
//       "BillingEmailId": " "
//     },
//     "ShippingAddress": {
//       "ShippingFirstName": " ",
//       "ShippingMiddleName": " ",
//       "ShippingLastName": " ",
//       "ShippingAddressLine1": " ",
//       "ShippingAddressLine2": " ",
//       "ShippingAddressLine3": " ",
//       "ShippingZip": " ",
//       "ShippingCity": " ",
//       "ShippingState": " ",
//       "ShippingProvince": " ",
//       "ShippingCountry": " ",
//       "ShippingMobileNumber": " ",
//       "ShippingOtherNumber": " ",
//       "ShippingEmailId": " "
//     },
//     "CheckInfo": {
//       "DriverLicenseEntryMode": " ",
//       "DriverLicenseData": " ",
//       "DriverLicenseState": " ",
//       "CheckEntryMode": " ",
//       "FullMICR": " ",
//       "RoutingNumber": " ",
//       "AccountNumber": " ",
//       "CheckNumber": " ",
//       "CheckType": " ",
//       "ConsumerDOB": " ",
//       "OtherIDEntryMode": " ",
//       "OtherIDType": " ",
//       "OtherIDData": " ",
//       "OtherIDState": " ",
//       "StateName": " "
//     },
//     "FraudScoreInfo": {
//       "ShippingMethod": " ",
//       "ShippingCompany": " ",
//       "EGCMessage": " ",
//       "EGCEmail": " ",
//       "DeviceFingerPrintId": " "
//     },
//     "PreSaleDate": " ",
//     "PreApprovalRefNumber": " ",
//     "GiftCardType": " ",
//     "GiftCardTypePassCode": " ",
//     "AurusPayTicketNum": " ",
//     "OrigAurusPayTicketNum": " ",
//     "OrigTransactionIdentifier": " ",
//     "ApprovalCode": " ",
//     "IVRAuthNumber": " ",
//     "SubTransType": " ",
//     "ShowResponse": "1",
//     "ReferralNum": " ",
//     "EqualPayPlanNum": " ",
//     "CurrencyCode": "840",
//     "DCCCurrencyCode": " ",
//     "DCCExchangeRate": "0.00",
//     "DCCFgnAmount": "0.00",
//     "DCCOffered": "0",
//     "ClerkID": "111",
//     "TransactionDate": "08142018",
//     "TransactionTime": "182712",
//     "TipEligible": "0",
//     "AmountNoBar": "0",
//     "BatchNumber": " ",
//     "AllowknukleBuster": "0",
//     "TicketProductData": {
//       "TicketCount": "1",
//       "Tickets": {
//         "Ticket": {
//           "TicketNumber": "1234567",
//           "ProductCount": "2",
//           "Products": {
//             "Product": [
//               {
//                 "ProductID": "1",
//                 "ProductName": "Product 1",
//                 "ProductShortDescription": "PrdShrt1",
//                 "ProductStatementDescriptor": " ",
//                 "DepartmentID": "001",
//                 "DepartmentName": "Electronic's",
//                 "Quantity": "2",
//                 "Price": "5.3",
//                 "Tax": " ",
//                 "ProductTypeFlag": " "
//               },
//               {
//                 "ProductID": "2",
//                 "ProductName": "Product 2",
//                 "ProductShortDescription": "PrdShrt2",
//                 "ProductStatementDescriptor": " ",
//                 "DepartmentID": "002",
//                 "DepartmentName": "Computer",
//                 "Quantity": "3",
//                 "Price": "15.4",
//                 "Tax": " ",
//                 "ProductTypeFlag": " "
//               }
//             ]
//           }
//         }
//       }
//     },
//     "UPCDetails": {
//       "UPCCount": " ",
//       "UPCItems": {
//         "UPCItem": [
//           {
//             "UPCIndicator": " ",
//             "UPCPLUData": " ",
//             "UPCItemPrice": " ",
//             "UPCQuantity": " ",
//             "UnitofMeasure": " "
//           },
//           {
//             "UPCIndicator": " ",
//             "UPCPLUData": " ",
//             "UPCItemPrice": " ",
//             "UPCQuantity": " ",
//             "UnitofMeasure": " "
//           }
//         ]
//       }
//     },
//     "FleetData": {
//       "FleetProductCount": " ",
//       "FleetProducts": {
//         "FleetProduct": [
//           {
//             "FleetProductSeqNo": " ",
//             "FleetProductDataType": " ",
//             "FleetServiceLevel": " ",
//             "FleetNACSCode": " ",
//             "FleetProductName": " ",
//             "FleetUnitOfMeasure": " ",
//             "FleetProductQuantity": " ",
//             "FleetProductUnitPrice": " ",
//             "FleetProductTotalAmount": " "
//           },
//           {
//             "FleetProductSeqNo": " ",
//             "FleetProductDataType": " ",
//             "FleetServiceLevel": " ",
//             "FleetNACSCode": " ",
//             "FleetProductName": " ",
//             "FleetUnitOfMeasure": " ",
//             "FleetProductQuantity": " ",
//             "FleetProductUnitPrice": " ",
//             "FleetProductTotalAmount": " "
//           }
//         ]
//       }
//     },
//     "Level3ProductsData": {
//       "Level3ProductCount": "2",
//       "Level3Products": {
//         "Level3Product": [
//           {
//             "L3ProductSeqNo": "001",
//             "L3ProductCode": "ProductCode",
//             "L3ProductName": "Product1",
//             "L3ProductDescription": " ",
//             "L3ProductQuantity": "2",
//             "L3UnitOfMeasure": "O",
//             "L3ProductUnitPrice": "3",
//             "L3ProductDiscount": "1.00",
//             "L3ProductTax": "1.11",
//             "L3ProductTaxRate": " ",
//             "L3ProductTotalAmount": "12"
//           },
//           {
//             "L3ProductSeqNo": "002",
//             "L3ProductCode": "ProductCode",
//             "L3ProductName": "Product2",
//             "L3ProductDescription": " ",
//             "L3ProductQuantity": "4",
//             "L3UnitOfMeasure": "UOM",
//             "L3ProductUnitPrice": "3",
//             "L3ProductDiscount": "1.00",
//             "L3ProductTax": "1.11",
//             "L3ProductTaxRate": " ",
//             "L3ProductTotalAmount": "12"
//           }
//         ]
//       }
//     },
//     "TenderTypeRestrictions": " ",
//     "SignatureFlag": "N",
//     "IsTokenizedTransaction": "0",
//     "FleetPromptCode": " ",
//     "AllowZipPrompt": "0",
//     "PartialAllowed": "1",
//     "PrintOnlyMode": "N",
//     "POSEnvironmentIndicator": " ",
//     "PLCCPaymentMethod": " ",
//     "AdditionalTags": {
//       "Tags": {
//         "Tag": [
//           {
//             "Key": " ",
//             "Value": " "
//           },
//           {
//             "Key": " ",
//             "Value": " "
//           }
//         ]
//       }
//     },
//     "Reserved1": " ",
//     "Reserved2": " "
//   }
// }