export default function (state = {since: Date.now(), action: Date.now()}, action) {
  switch (action.type) {
    case 'SINCE_FREQUENT_GLOBAL':
      return {...state, since: action.since}
    case 'UNTIL_FREQUENT_GLOBAL':
      return {...state, until: action.until}
    default:
      return state;
  }
}