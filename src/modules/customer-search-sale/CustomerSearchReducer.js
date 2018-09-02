const initialState = {
    buttonId: '',
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
    flow:'',
    dataFrom: '',
    customer: {},
    searchItem:'',
    clienteled : true,
    error_message:'',
    isValid : false
};


export function CustomerSearchReducer(state = initialState, action) {
    console.log("IN CUSTOMER CART REDUCER", action);
    switch (action.type) {

        case 'SET_BUTTON_CLICK_ID':
            return {
                ...state,
                buttonId : action.payload,
                isSearchItemSet :  false,
                dataFrom :'',
                error_message: '',
                isValid : true
            };

        case 'GET_CUSTOMERS':
            return {
                ...state,
                data: action.payload ,
                isSearchItemSet :  false    ,
                dataFrom :'',
                error_message:'',
                isValid : true, 
            };

        case 'SET_CUSTOMER':
            return {
                ...state,
                customer: action.payload,
                isSearchItemSet :  false,
                dataFrom :'',
                error_message:'',
                isValid : true
            };
       
        case 'CUST_INCIRCLE_INFO':
            return {
                ...state,
                incircleData: action.payload,
                isSearchItemSet :  false,
                dataFrom : '',
                error_message:'',
                isValid : true
            };
        case 'CUST_INCIRCLE_ERROR':
            return {
                ...state,
                incircleData: null,
                isSearchItemSet :  false,
                dataFrom :'',
                error_message:'',
                isValid : true
            };
       
        case 'GET_ISELL_CART_REQUEST_SUCCESS': {
            console.log('**reducer: action.payload', action.payload);
            if(action.payload === null) {
                return {
                    ...state,
                    data: action.payload,
                    dataFrom: 'GET_ISELL_CART_REQUEST_UPDATE_FAILURE',
                    error_message:'',
                    isValid : true
                };
            }
            else {
                return {
                    ...state,
                    data: action.payload,
                    dataFrom: 'GET_ISELL_CART_REQUEST_UPDATE',
                    error_message:'',
                    isValid : true
                };
            }
        }
        case 'SET_SEARCHITEM_DATA':
            return {
            ...state,
            searchItem: action.payload,
            isSearchItemSet :  true,
            dataFrom : '',
            error_message:'',
            isValid : true
            
        };

        case 'SET_CLIENTELED':
            return {
                ...state,
                clienteled : action.payload,
                dataFrom: 'SET_CLIENTELED',
                error_message:'',
                isValid : true
            };

        case 'CLEAR_SEARCH_DATA':
        return {
            ...state,
            searchItem: '',
            isSearchItemSet :  false,
            data : {},
            dataFrom : '',
            error_message:'',
            isValid : true
            
        }
        case 'SET_ISELL_FLOW':
        return{
            ...state,
            flow:action.payload,
            dataFrom:'SET_ISELL_FLOW',
            error_message:'',
            isValid : true
        }
        case 'CS_CUSTNOTFOUND':
        return {
            ...state,
            dataFrom : 'CS_CUSTNOTFOUND',
            error_message:'',
            isValid : true
            
        }
        case 'CS_GENERALERROR':
            return{
                ...state,
                dataFrom:'CS_GENERALERROR',
                error_message:'',
                isValid: false
            }

        case 'CUSTOMSEARCH_REQUEST_VALIDFAILED':
                return{
                    ...state,
                    searchItem: '',
                    isSearchItemSet :  false,
                    data : {},
                    dataFrom : '',
                    error_message: action.message,
                    isValid : false,
                }
        default:
            return state;
    }
}



