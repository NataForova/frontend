const types = {
    AUTH_SELF_REQUEST: 'AUTH_SELF_REQUEST',
    AUTH_SELF_FAILURE: 'AUTH_SELF_FAILURE',
    AUTH_SELF_SUCCESS: 'AUTH_SELF_SUCCESS',
    AUTH_LOGOUT: 'AUTH_LOGOUT',
    LOCATION_CHANGE: 'LOCATION_CHANGE',
    USER_INFO_CHANGE: 'USER_INFO_CHANGE'
};

const initialState = {
    fetching: false,
    authenticated: false,
    error: null,
    user: {},
    usersDetails: {},
};

export default (state = initialState, action) => {
    switch (action.type) {

        case types.AUTH_SELF_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };

        case types.AUTH_SELF_FAILURE:
            return {
                ...state,
                fetching: false,
                authenticated: false,
                error: action.payload.error,
            };

        case types.AUTH_SELF_SUCCESS:
            return {
                ...state,
                fetching: false,
                authenticated: true,
                error: null,
                user: action.payload.data,
            };

        case types.AUTH_LOGOUT:
            return {
                ...state,
                fetching: false,
                authenticated: false,
                user: null,
            };
        case types.LOCATION_CHANGE:
            return {
                ... state,
                usersDetails: {
                    ...state.usersDetails,
                    ...action.payload.data
                }
            };
        case types.USER_INFO_CHANGE:
            return  {
                ... state,
                usersDetails: {
                    ...state.usersDetails,
                    ...action.payload.data
                }
            }
        default:
            return state;
    }
};
