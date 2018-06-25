const initialState = {
  frequentGlobal: [],
  frequentPerForum: [],
  forumList: [],
  since_global: new Date(), 
  until_global: new Date(),
  since_perforum: new Date(), 
  until_perforum: new Date(),
  forum : {},
  limit_global: 0,
  limit_perforum:0
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
      return {...state, since_global: action.since, until_global: action.until, limit_global: action.limit};
    case 'UPDATE_FREQUENT_PERFORUM':
      return {...state, since_perforum: action.since, until_perforum: action.until, limit_perforum: action.limit, forum: action.forum};
    default:
      return state;
  }
}