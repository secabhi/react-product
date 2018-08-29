import { json2xml } from '../../common/helpers/helpers';
import call2Orders from './call2Orders';

const byPassJson = require('../../../resources/BypassScreen.json');


export default (total, ticket, callback) => {
	//convert to xml
	const xmlVoidRequest = json2xml(byPassJson);
	console.log('xml Void Request', xmlVoidRequest);

	//make async orders call
	makeOrdersCall(xmlVoidRequest, callback)
}

async function makeOrdersCall(xmlRequest, callback) {
	const response = await call2Orders(xmlRequest);

	//waits for response
	console.log('Response', response);
}
