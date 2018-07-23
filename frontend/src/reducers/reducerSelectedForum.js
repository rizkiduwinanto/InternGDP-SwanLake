export default function (state = [], action) {
  switch (action.type) {
    case 'SELECT_THREAD':
      return action.payload;
    default :
      return state;
  }
}