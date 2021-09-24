const initialState = {
    currentProjectId: '60f619fb2e42a8eea84526b9',
    selectedProjectDetails: {}
};

function projectReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECT_ID':
            return { ...state, currentProjectId: action.payload }
            break;
        case 'SET_PROJECT':
            return { ...state, selectedProjectDetails: {...action.payload} }
            break;
        default:
            return state;
    }
};

export default projectReducer;