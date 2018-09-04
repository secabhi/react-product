
const initialState = {
    nonClientele: {firstname: null, lastname:null, email: null, tracking: false},
    clientele: {email: null, tracking: false},
    tracking:false,

}

export default (state = initialState, action) => {
    switch(action.type) {          
        case 'UPDATE_CLIENTELE_EMAIL':
        state.clientele.email = action.payload;
        return {
            ...state,
        }

        case 'UPDATE_NON_CLIENTELE_INFO':
        const newNonClienteleInfo = {...action.payload, tracking:state.tracking}
        
        return {
            ...state,
            clientele: newNonClienteleInfo
        }

        case 'UPDATE_TRACKING_CLIENTELE':
            state.tracking = action.payload;
        return {
            ...state,
        }

        case 'UPDATE_TRACKING_NON_CLIENTELE':
            state.tracking = action.payload;
        return {
            ...state,
        }

        default:
        return state;

    }
}