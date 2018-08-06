import convertDate from '../miscellaneous/converterDate';

export function updateFrequentGlobal(since, until, limit) {
  return {
    type: 'UPDATE_FREQUENT_GLOBAL',
    since,
    until,
    limit
  };
}

export function receiveFrequentGlobal(data){
  return {
    type: 'RECEIVE_FREQUENT_GLOBAL',
    data
  };
}

export const fetchFrequentGlobal = (since, until, limit) => async (dispatch, getState, url_api) => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    var url = '';
    if (limit === 0) {
      url = `${url_api}/api/frequent_poster/${sinceConverted}/${untilConverted}`;
    } else {
      url = `${url_api}/api/frequent_poster/${sinceConverted}/${untilConverted}?limit=${limit}`;
    }
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveFrequentGlobal(responseBody));
  } catch(error) {
    console.log(error);
  }
}