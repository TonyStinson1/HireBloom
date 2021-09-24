const initialState = {
    userData: {},
    userToken: ''
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, userData: action.payload }
            break;
        case 'SET_TOKEN':
            return { ...state, userToken: action.payload }
            break;
        default:
            return state;
    }
};

export default userReducer;