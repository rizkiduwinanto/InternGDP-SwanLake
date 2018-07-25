import convertDate from '../miscellaneous/converterDate';

export function receiveWordcloud(data){
  return {
    type: 'RECEIVE_WORDCLOUD',
    data
  };
}

export const fetchWordcloud = (since, until,limit) => async (dispatch, getState, url_api) => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    let url = `${url_api}/api/words/${sinceConverted}/${untilConverted}`;
    if (limit === 0) {
      url = `${url_api}/api/words/${sinceConverted}/${untilConverted}`;
    } else {
      url = `${url_api}/api/words/${sinceConverted}/${untilConverted}?limit=${limit}`;
    }
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveWordcloud(responseBody.data));
  } catch(error) {
    console.log(error);
  }
}