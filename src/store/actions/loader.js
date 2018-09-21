import {
    SET_LOADING,
} from 'store/reducers/loader';

export function setLoading(loading) {
    return {
        type: SET_LOADING,
        loading
    }
}