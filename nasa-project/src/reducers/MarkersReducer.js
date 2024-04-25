export default function MarkersReducer(state = [], action) {
  switch (action.type) {
    case 'COLLECT_MARKERS':
      let x = [...state, ...action.payload];
      return x
    /* return [...state, ...action.payload]; */
    default:
      return state;
  }
}

