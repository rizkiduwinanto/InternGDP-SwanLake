export const fetchEmail = () => async (dispatch, getState, url_api) => {
  try {
    const url =  `${url_api}/api/keyword_mail_addr`;
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveEmail(responseBody));
  } catch (error) {
    console.log(error);
  }
}

export function receiveEmail(data) {
  return {
    type: 'RECEIVE_EMAIL',
    data
  };
}

export const fetchKeyword = () => async (dispatch, getState, url_api) => {
  try {
    const url =  `${url_api}/api/mail_keywords`;
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveKeyword(responseBody));
  } catch (error) {
    console.log(error);
  }
} 

export function receiveKeyword(data) {
  return {
    type: 'RECEIVE_KEYWORD',
    data
  };
}

export const insertKeyword = (interval, keyword) => {
  return (dispatch, getState, url_api) => {
    const json = {
      keyword: keyword,
      interval: interval
    };

    return fetch(`${url_api}/api/mail_keywords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      })
      .then(response => {
        dispatch(postKeyword(json));
      })
      .catch(error => {
        console.log(error);
      });
  };
} 

export function postKeyword(data) {
  return {
    type: 'POST_KEYWORD',
    data
  };
}