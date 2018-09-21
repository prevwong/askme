export const SET_USER = 'SET_USER'
export const SET_INFO = 'SET_INFO'

const initialState = {
    user: null,
    info: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            console.log("setting user", action.user);
            return {
                ...state,
                user: action.user
            }
        case SET_INFO: 
            let info;
            if ( typeof action.info === "object" ) {
                info = Object.keys(action.info).length > 0 ? action.info : null;
            } else { 
                info = null
            }
            console.log("SETTING INFO", info);
            return {
                ...state,
                info
            }
        default:
            return state
    }
}