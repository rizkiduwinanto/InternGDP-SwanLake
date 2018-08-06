import convertDate from '../miscellaneous/converterDate';

export function updateFrequentPerForum(since, until, limit, forum) {
  return {
    type: 'UPDATE_FREQUENT_PERFORUM',
    since,
    until,
    limit,
    forum
  };
}

export function updateForum(forum) {
  return {
    type: 'UPDATE_FORUM',
    forum
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

export const fetchFrequentPerForum = (since, until, limit, forum_id) => async (dispatch, getState, url_api) => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    var url = '';
    if (limit === 0) {
      url = `${url_api}/api/frequent_poster/${sinceConverted}/${untilConverted}?forum=${forum_id}`;
    } else {
      url = `${url_api}/api/frequent_poster/${sinceConverted}/${untilConverted}?forum=${forum_id}&limit=${limit}`;
    }
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveFrequentPerForum(responseBody));
  } catch(error) {
    console.log(error);
  }
}