import convertDate from '../converterDate';

export function updateFrequentGlobal(since, until) {
  return {
    type: 'UPDATE_FREQUENT_GLOBAL',
    since,
    until
  };
}

export function receiveFrequentGlobal(data){
  return {
    type: 'RECEIVE_FREQUENT_GLOBAL',
    data
  };
}

export const fetchFrequentGlobal = (since, until) => async (dispatch, getState, url_api) => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    const url = `${url_api}/api/frequent_poster/${sinceConverted}/${untilConverted}`;
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveFrequentGlobal(responseBody));
  } catch(error) {
    console.log(error);
  }
}