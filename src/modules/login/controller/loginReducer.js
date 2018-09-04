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
    error: null,
    isValid : false, 
    error_message:''
    
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
                error_message:'',
                isValid : true, 

            };
        case CLEAR_REQUEST:

            return {
                ...state,
                response: action.payload,
                error_message:'',
                isValid : true,
            };
        case 'LOGIN_REQUEST_VALIDFAILED':
                return{
                    ...state,
                    response:null,
                    error_message: action.message,
                    isValid : false,
                }

            default:
                return state
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