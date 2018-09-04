import {LOGIN_REQUEST, SEND_USERPIN, CHANGE_PASSWORD_REQUEST, CLEAR_REQUEST} from '../../common/constants/type';

const initialState = {
    response: {
        response_Code: "",
        response_Text: ""
    },
    userPin: {userPin: "", uPass:""},
    error: null,
    isValid: false,
    cleared: {}

};

export function changePwrdReducer(state = initialState, action) {
    //console.log("chng pwrd action recieved", action.payload);
    
    switch (action.type){
        case SEND_USERPIN:
                       console.log('SENT USERPIN:', action.payload)
            return {
                ...state,
                userPin: action.payload
            }

        case CHANGE_PASSWORD_REQUEST: 
        console.log(action.payload)           
            return {
                ...state,
                response: action.payload.data,
                userPin: action.payload.userpin,
                isValid: true

            }

        case CLEAR_REQUEST:
        console.log(action.payload)      
            return {
                ...state,
                cleared: action.payload,
            };

        case 'PW_CANTCHANGEYET' :
        console.log(action.payload)      
            return {
                ...state,
                response: action.payload,
            };
                
        case 'CHANGE_PASSWORD_FAILED' :
            return {
                ...state,
                response: action.payload,
                isValid: false,
                error: action.message
            }
        case 'REQUEST_FAILED' :
            return {
                ...state,
                response: action.payload,
                isValid: false,
                error: action.message
            }

        default:
            return state;

    }
}

// export function customerReducer(state = initialState, action) {
//     switch(action.type) {
//         case //type:
//         return {
//             ...state,
//             loading: true,
//             error : null
//         }

//         case //type success:
//         return {
//             ...state,
//             loading: true,
//             items: action.payload.flag
//         }

//         case //type error:
//         return {
//             ...state,
//             loading: true,
//             error : action.payload.error,
//             items: []
//         }

//         default:
//             return state;
//     }
// }