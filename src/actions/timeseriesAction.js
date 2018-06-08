import convertDate from '../converterDate';

export function receiveTimeseries(data){
  return {
    type: 'RECEIVE_TIMESERIES',
    data
  };
}

export function loadingTimeseries(flag){
  return {
    type: 'LOADING_TIMESERIES',
    flag
  };
}

export const fetchTimeseries = (since, until, word) => async dispatch => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    const url = `http://localhost:3001/api/trend/${sinceConverted}/${untilConverted}/${word}`;
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveTimeseries(responseBody.data));
  } catch(error) {
    console.log(error);
  }
}