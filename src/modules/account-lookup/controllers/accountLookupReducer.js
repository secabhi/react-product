const initialState = {
    data:{
        response_code: 0,
        response_text: "",
        cardList: []
    },
    UseInTransAccount:{
            kiNum:"",
            lastFour:"",
            chargeType:"",
            customerFname:"",
            customerLname:""
        },
        UseInTransAccounts: [],
        isNextInquiry:false,
        isThirdParty:false,
        useStoredCard:false,
        path:'',
        error_message: '',
        isValid : false,
};

export function CardsReducer(state = initialState, action) {
    switch (action.type) {
     
        case "GET_CARDS_SUCCESS" : {
           
            return { 
                ...state,
                data : action.payload,
                dataFrom : 'GET_CARDS_SUCCESS',
                error_message:'',
                isValid : true,
            }

        }


        case 'GET_CARDS_REQUEST_VALIDFAILED':
                return{
                    ...state,
                    data : {},
                    dataFrom : '',
                    error_message: action.message,
                    isValid : false,
                    isNextInquiry:false,
                    isThirdParty:false,
                    useStoredCard:false,
                    path:'',
                }


        case "GET_CARDS_GENERALERROR" : {
             return { 
                 ...state,
                 data : action.payload,
                 dataFrom : 'GET_CARDS_GENERALERROR',
                 error_message: action.message,
                 isValid : true,
             }
 
         }

        
        case "CLEAR_CARDS" : {
            return { 
                ...initialState,
                dataFrom : 'CLEAR_CARDS'
            }

        }
        case "CLEAR_IS_VALID" : {
            return { 
                ...state,
                error_message: '',
                isValid : false,
                isNextInquiry:false,
                isThirdParty:false,
                useStoredCard:false,
                path:'',
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

      /*  case 'USE_IN_TRANS': {
            var aurusResponse = action.payload;
            console.log("PURNIMA: aurus response account lookup reducer" + aurusResponse);
            var lastd4igits = aurusResponse.CardToken[0].substr(aurusResponse.CardToken[0].length - 4);
            var useInTransAccount = {
                cardToken: (aurusResponse.CardToken[0]) ? (aurusResponse.CardToken[0]) : '',
                kiNum: (aurusResponse.KI[0]) ? (aurusResponse.KI[0]) : '',
                customerFname: (aurusResponse.FirstName[0]) ? ((aurusResponse.FirstName[0]).trim()) : '',
                customerLname: (aurusResponse.LastName[0]) ? ((aurusResponse.LastName[0]).trim()) : '',
                chargeType: (aurusResponse.CardType[0]) ? (aurusResponse.CardType[0]) : '',
                lastFour: lastd4igits
            }
            console.log("PURNIMA: use in transaction account lookup reducer" + useInTransAccount);
            return {
                ...state,
                ...action.payload,
                UseInTransAccounts: [useInTransAccount, ...state.UseInTransAccounts],
                dataFrom: 'STORE_CARDS'
            };

        } */

        case 'USE_IN_TRANS': {
            //debugger;
            var aurusResponse = action.payload.GetCardBINResponse;
            var lastd4igits = aurusResponse.CardToken[0].substring(aurusResponse.CardToken[0].length - 4); //5543
            console.log("PURNIMA: aurus response account lookup reducer lastfourdigits from response" + lastd4igits);
            var useInTransAccount = {
                cardToken: (aurusResponse.CardToken[0]) ? (aurusResponse.CardToken[0]) : '',
                kiNum: (aurusResponse.KI[0]) ? (aurusResponse.KI[0]) : '',
                customerFname: (aurusResponse.FirstName[0]) ? ((aurusResponse.FirstName[0]).trim()) : '',
                customerLname: (aurusResponse.LastName[0]) ? ((aurusResponse.LastName[0]).trim()) : '',
                chargeType: (aurusResponse.CardType[0]) ? (aurusResponse.CardType[0]) : '',
                lastFour: lastd4igits
            }
            console.log("PURNIMA: use in transaction account lookup reducer" + useInTransAccount);
            //debugger;
            return {
                ...state,
                ...action.payload,
                UseInTransAccount: useInTransAccount,
                UseInTransAccounts: [useInTransAccount, ...state.UseInTransAccounts],
                dataFrom: 'STORE_CARDS'
            };
        }

       /* case 'STORE_CARD_DETAILS': {
            return {
              ...state,
              ...action.payload,
              dataFrom:'STORE_CARDS'
            };
          } */
        default: 
        {
            return state
        }
    }
}

