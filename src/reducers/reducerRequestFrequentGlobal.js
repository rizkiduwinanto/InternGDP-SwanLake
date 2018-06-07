export default function (state = {since: new Date(), until: new Date()}, action) {
  switch (action.type) {
    case 'SINCE_FREQUENT_GLOBAL':
      return {...state, since: action.since}
    case 'UNTIL_FREQUENT_GLOBAL':
      return {...state, until: action.until}
    default:
      return state;
  }
}