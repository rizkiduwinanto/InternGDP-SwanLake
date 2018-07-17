const initialState = {
  email: null,
  keyword: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_EMAIL':
      return {...state, email: action.data}
    case 'RECEIVE_KEYWORD':
      return {...state, keyword: action.data}
    default:
      return state;
  }
}