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
    case 'ADD_KEYWORD':
      return {...state, keyword: [...state.keyword, action.data]}
    case 'ERASE_KEYWORD':
      return {...state, keyword: state.keyword.filter((keyword) => keyword.keyword !== action.data.keyword)}
    case 'EDIT_KEYWORD':
      return {...state, keyword: state.keyword.map((keyword) => {
        var temp = Object.assign({}, keyword);
        if (temp.keyword === action.data.keyword) {
          temp.interval = action.data.interval;
        }
        return temp;
      })}
    default:
      return state;
  }
}