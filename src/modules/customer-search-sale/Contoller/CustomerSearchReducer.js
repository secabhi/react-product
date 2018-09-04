import {GET_CUSTOMERS, SET_CUSTOMER} from '../../common/constants/type';

const initialState = {
    buttonId : '',
    data: {
        id: '',
    cssId: '',
    customerIDs: [{
            idSource: '',
            id: '',
            lastUpdatedDate: ''
        }],
    names: [],
    personNames: [{
            rawValue: '',
            firmName: '',
            salutation: '',
            prefix: '',
            firstName: '',
            middleName: '',
            lastName: '',
            preferredName: '',
            suffix: ''
        }],
    phoneNumbers: [],
    emails: [],
    addresses: [],
    myCustomer: '' 
    },
    customer: {}
};


export function CustomerSearchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BUTTON_CLICK_ID':
            return {
                ...state,
                buttonId: action.payload
            };

        case GET_CUSTOMERS:
            return {
                ...state,
                data: action.payload
            };

        case SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            }
	    
            case 'SET_CLIENTELED':
            return {
                ...state,
                clienteled: action.payload
            }
            
        default:
            return state;
    }
}



