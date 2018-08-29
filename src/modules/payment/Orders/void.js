import { json2xml } from '../../common/helpers/helpers';
import call2Orders from './call2Orders';

const TransRequestJson = require("../../../resources/aurus/TransRequest.json");

export default (total, ticket, callback) => {
	console.log('Sweezey in Void');
	//write over Json object with new params for void
	TransRequestJson.TransRequest.KI = " ";
	TransRequestJson.TransRequest.KIType = " ";
	TransRequestJson.TransRequest.CardType = " ";
	TransRequestJson.TransRequest.CardToken = " ";
	TransRequestJson.TransRequest.TransAmountDetails.TransactionTotal = total;
	TransRequestJson.TransRequest.TransactionType = "06"
	TransRequestJson.TransRequest.OrigAurusPayTicketNum = ticket;
	
	//convert to xml
	const xmlVoidRequest = json2xml(TransRequestJson);
	console.log('xml Void Request', xmlVoidRequest);

	//make async orders call
	makeOrdersCall(xmlVoidRequest, callback)
}

async function makeOrdersCall(xmlRequest, callback) {
	const response = await call2Orders(xmlRequest);

	//waits for response
	console.log('Response', response);

	//return response to callback
	callback(response);
}



