
export default function (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_WORDCLOUD':
      return {state: action.data};
    default:
      return state;
  }
}