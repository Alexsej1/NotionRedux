const initialState = {
    notes: [],
    loading:false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET/NOTES/LOADING":
            return { ...state, loading: true }
        case "SET/NOTES/DATA":
            return { ...state, notes: payload,loading:false }

        default:
            return state
    }
}
