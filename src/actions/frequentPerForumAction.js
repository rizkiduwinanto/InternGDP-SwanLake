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

export const fetchForumList = () => async dispatch => {
  try {
    const url = 'http://localhost:3001/api/forum_list'
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveForumList(responseBody));
  } catch(error) {
    console.log(error);
  }
}

export const fetchFrequentPerForum = (since, until, forum_id) => async dispatch => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    const url = `http://localhost:3001/api/frequent-poster/${sinceConverted}/${untilConverted}?forum=${forum_id}`
    const response = await fetch(url);
    const responseBody = await response.json();
    console.log(url);
    console.log(responseBody);
    dispatch(receiveFrequentPerForum(responseBody));
  } catch(error) {
    console.log(error);
  }
}