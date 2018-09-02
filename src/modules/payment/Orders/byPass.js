import { json2xml } from '../../common/helpers/helpers';
import call2Orders from './call2Orders';

const byPassJson = require('../../../resources/BypassScreen.json');

export default () => {
	//convert to xml
	const xmlVoidRequest = json2xml(byPassJson);
	console.log('xml Void Request', xmlVoidRequest);

	//make async orders call. Return promise
	return call2Orders(xmlVoidRequest)
}

