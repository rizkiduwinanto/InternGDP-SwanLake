const initialState = {
  email: "empty",
  keyword: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_EMAIL':
      return {...state, email: action.data.email}
    case 'RECEIVE_KEYWORD':
      return {...state, keyword: action.data}
    case 'POST_KEYWORD':
      return {...state, keyword: [...state.keyword, action.data]}
    default:
      return state;
  }
}