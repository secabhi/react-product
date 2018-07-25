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
    dataFrom: '',
    customer: {},
    searchItem:''
};


export function CustomerSearchReducer(state = initialState, action) {
    console.log("IN CUSTOMER CART REDUCER", action);
    switch (action.type) {

        case 'SET_BUTTON_CLICK_ID':
            return {
                ...state,
                buttonId : action.payload,
                isSearchItemSet :  false,
                dataFrom :''
            };

        case 'GET_CUSTOMERS':
            return {
                ...state,
                data: action.payload ,
                isSearchItemSet :  false    ,
                dataFrom :''
            };

        case 'SET_CUSTOMER':
            return {
                ...state,
                customer: action.payload,
                isSearchItemSet :  false,
                dataFrom :''
            };
       
        case 'CUST_INCIRCLE_INFO':
            return {
                ...state,
                incircleData: action.payload,
                isSearchItemSet :  false,
                dataFrom : ''
            };
        case 'CUST_INCIRCLE_ERROR':
            return {
                ...state,
                incircleData: null,
                isSearchItemSet :  false,
                dataFrom :''
            };
        case 'GET_ISELL_CART_REQUEST_SUCCESS': {
            console.log('**reducer: action.payload', action.payload);
            return {
                ...state,
                data: action.payload,
                dataFrom: 'GET_ISELL_CART_REQUEST_UPDATE'
            };
        }
        case 'SET_SEARCHITEM_DATA':
            return {
            ...state,
            searchItem: action.payload,
            isSearchItemSet :  true,
            dataFrom : ''
            
        };

        case 'SET_CLIENTELED':
            return {
                ...state,

                clienteled : action.payload,
                dataFrom: 'SET_CLIENTELED'
            };

        case 'CLEAR_SEARCH_DATA':
        return {
            ...state,
            searchItem: '',
            isSearchItemSet :  false,
            data : {},
            dataFrom : ''
            
        }
        default:
            return state;
    }
}



