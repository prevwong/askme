export const LOG_IN = 'LOG_IN'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SOCIAL_LOG_IN_EMAIL_EXISTS = 'SOCIAL_LOG_IN_EMAIL_EXISTS';
export const LOG_IN_CANCEL = "LOG_IN_CANCEL";

export const LOG_IN_FILL_INFO = 'LOG_IN_FILL_INFO';
export const LOG_IN_NO_PHONE = 'LOG_IN_NO_PHONE';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const initialState = {
    isAuthenticating: false,
    error: null,
    needInfo: false,
    noPhone: false,
    socialEmailExists: false,
    authenticated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                isAuthenticating: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                user: action.user,
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                error: action.error,
            }
        case LOG_IN:
            return {
                ...state,
                isAuthenticating: true
            }
        case SOCIAL_LOG_IN_EMAIL_EXISTS: {
            return {
                ...state,
                socialEmailExists: {
                    email: action.email,
                    credential: action.credential
                }
            }
        }
        case LOG_IN_CANCEL: {
            return {
                ...state,
                socialEmailExists: false
            }
        }
        case LOG_IN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                error: false,
                isAuthenticating: false,
            }
        case LOG_IN_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                error: action.error,
            }
        case LOG_OUT:
            return {
                ...initialState,
            }
        default:
            return state
    }
}