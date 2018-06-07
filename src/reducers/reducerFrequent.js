const initialState = {
  frequentGlobal: [],
  frequentPerForum: [],
  forumList: [],
  since_global: new Date(), 
  until_global: new Date(),
  since_perforum: new Date(), 
  until_perforum: new Date(),
  id: 0,
  name:'Frequent Poster Per Forum'
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_FREQUENT_PERFORUM':
      return {...state, frequentPerForum: action.data};
    case 'RECEIVE_FREQUENT_GLOBAL':
      return {...state, frequentGlobal: action.data};
    case 'RECEIVE_FORUM_LIST':
      return {...state, forumList: action.data}; 
    case 'UPDATE_FREQUENT_GLOBAL':
      return {...state, since_global: action.since, until_global: action.until};
    case 'UPDATE_FREQUENT_PERFORUM':
      return {...state, since_perforum: action.since, until_perforum: action.until};
    case 'UPDATE_FORUM':
      return {...state, id: action.id, name: action.name};
    default:
      return state;
  }
}