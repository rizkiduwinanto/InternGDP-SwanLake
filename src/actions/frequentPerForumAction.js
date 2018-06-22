import convertDate from '../converterDate';

export function updateForum(id, name) {
  return {
    type: 'UPDATE_FORUM',
    id,
    name
  };
}

export function updateFrequentPerForum(since, until) {
  return {
    type: 'UPDATE_FREQUENT_PERFORUM',
    since,
    until
  };
}

export function receiveForumList(data){
  return {
    type: 'RECEIVE_FORUM_LIST',
    data
  };
}

export function receiveFrequentPerForum(data){
  return {
    type: 'RECEIVE_FREQUENT_PERFORUM',
    data
  };
}

export const fetchFrequentPerForum = (forum_id) => async (dispatch, getState, url_api) => {
  try {
    const sinceConverted = convertDate(getState().since_perforum);
    const untilConverted = convertDate(getState().until_perforum);
    const url = `${url_api}/api/frequent_poster/${sinceConverted}/${untilConverted}?forum=${forum_id}`
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveFrequentPerForum(responseBody));
  } catch(error) {
    console.log(error);
  }
}