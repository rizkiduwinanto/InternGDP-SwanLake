import convertDate from '../converterDate';

export function receiveWordcloud(data){
  return {
    type: 'RECEIVE_WORDCLOUD',
    data
  };
}

export const fetchWordcloud = (since, until) => async dispatch => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    const url = `http://localhost:3001/api/words/${sinceConverted}/${untilConverted}`;
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveWordcloud(responseBody.data));
  } catch(error) {
    console.log(error);
  }
}