import {LOGIN_REQUEST, CLEAR_REQUEST} from '../../common/constants/type';

const initialState = {
    response: {
        Output:{
            rc : 0,
            Response_Code : " ",
            Response_Text : " "
        },
        RESPONSE_CODE:' ',
        RESPONSETEXT:' '
    },
    loading: false,
    error: null
};

export function loginReducer(state = initialState, action) {
    //console.log("action recieved", action.payload);
    
    switch (action.type){
        case LOGIN_REQUEST:
            // return {
            //     ...state,
            //     response: action.payload
            // }
            return {
                ...state,
                response: action.payload.data,
                userpin: action.payload.userpin,
                loading: false,
            };
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