import {LOGIN_REQUEST, SEND_USERPIN, CHANGE_PASSWORD_REQUEST, CLEAR_REQUEST} from '../../common/constants/type';

const initialState = {
    response: {
        Output:{
            rc : 0,
            Response_Code : "",
            Response_Text : ""
        },
        RESPONSE_CODE:'',
        RESPONSETEXT:''
    },
    userPin: {userPin: "", uPass:""},
    error: null
};

export function changePwrdReducer(state = initialState, action) {
    //console.log("chng pwrd action recieved", action.payload);
    
    switch (action.type){
        case SEND_USERPIN:
                       console.log('SENT USERPIN:', action.payload)
            return {
                ...state,
                userPin: action.payload,
                loading: false,
            }

        case CHANGE_PASSWORD_REQUEST:            
            return {
                ...state,
                response: action.payload,
                loading: false,
            }

        case CLEAR_REQUEST:

            return {
                ...state,
                response: action.payload,
            };

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