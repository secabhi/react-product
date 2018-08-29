const initialState = {
    UseInTransAccount:{
            kiNum:"",
            lastFour:"",
            chargeType:"",
            customerFname:"",
            customerLname:""
        },
        isNextInquiry:false,
        isThirdParty:false,
        useStoredCard:false,
        path:''

};

export function CardsReducer(state = initialState, action) {
    switch (action.type) {
     
        case "GET_CARDS_SUCCESS" : {
           
            return { 
                ...state,
                data : action.payload,
                dataFrom : 'GET_CARDS_SUCCESS'
            }

        }
        case "CLEAR_CARDS" : {
            return { 
                ...initialState,
                dataFrom : 'CLEAR_CARDS'
            }

        }
        case "SET_NEXT_INQUIRY" : {
            return { 
                ...state,
                isNextInquiry  : action.payload,
                dataFrom : 'SET_NEXT_INQUIRY'
            }

        }
        case "SET_THIRD_PARTY" : {
            return { 
                ...state,
                isThirdParty  : action.payload,
                dataFrom : 'SET_THIRD_PARTY'
            }

        }

        case "SET_TENDERING" : {
            return { 
                ...state,
                useStoredCard  : action.payload,
                dataFrom : 'SET_TENDERING'
            }

        }
        case "SET_TENDERING_CLEAR" : {
            return { 
                ...state,
                useStoredCard  : action.payload,
                dataFrom : ''
            }

        }
        

        case "CURRENT_PATH":{
            return{
            ...state,
            path:action.payload,
            dataFrom : 'CURRENT_PATH'
            }
        }
        case 'STORE_CARD_DETAILS': {
            return {
              ...state,
              ...action.payload,
              dataFrom:'STORE_CARDS'
            };
          }
        default: 
        {
            return state
        }
    }
}

