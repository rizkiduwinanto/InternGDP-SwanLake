export default function (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_TIMESERIES':
      return {state: action.data};
    default:
      return state;
  }
}