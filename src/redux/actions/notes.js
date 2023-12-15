export const getNotes = (userId) => {
    return async (dispatch) => {
        dispatch({ type: "SET/NOTES/LOADING" })
        const notes = await fetch(`http://localhost:5000/notes?userId=${userId}`).then(res => res.json());
        dispatch({
            type: 'SET/NOTES/DATA',
            payload: notes,
        });
    };
};