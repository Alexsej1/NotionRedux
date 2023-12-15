const initialState = {
    loading: false,
    error: null,
    user: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET/USER/LOADING':
            return { ...state, loading: true }
        case 'SET/USER/ERROR':
            return { ...state, loading: false, error: payload }
        case 'SET/USER/DATA':
            return { ...state, loading: false, user: payload }
        default:
            return state
    }
}
