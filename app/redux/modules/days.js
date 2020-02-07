import { GET_DAY, GET_DAY_SUCCESS, GET_DAY_ERROR } from '../../constants/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DAY: {
            const { date } = action.payload;
            return {
                ...state,
                [date]: {
                    ...(state?.[date] || {}),
                    loading: true,
                    error: '',
                },
            };
        }

        case GET_DAY_ERROR: {
            const { date, error } = action.payload;
            return {
                ...state,
                [date]: {
                    ...(state?.[date] || {}),
                    loading: false,
                    error,
                },
            };
        }

        case GET_DAY_SUCCESS: {
            const { date, day } = action.payload;
            return {
                ...state,
                [date]: {
                    ...(state?.[date] || {}),
                    data: day,
                    loading: false,
                },
            };
        }

        default:
            return state;
    }
}
