export default function (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_FREQUENT_GLOBAL':
      return action.data;
    case 'ERROR_FREQUENT_GLOBAL':
      return action.err;
    default:
      return state;
  }
}
