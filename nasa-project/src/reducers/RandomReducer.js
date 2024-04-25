export default function RandomReducer(state = [], action) {
    switch (action.type) {
        case 'UPDATE_RANDOM_MARKERS':
            return action.payload;
        default:
            return state;
    }
};
