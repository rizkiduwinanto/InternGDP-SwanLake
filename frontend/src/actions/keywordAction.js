export const fetchEmail = () => async (dispatch, getState, url_api) => {
  try {
    const url =  `${url_api}/api/keyword_mail_addr`
    console.log(url);
    const response = await fetch(url);
    const responseBody = await response.json();
    console.log(responseBody.success);
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
    const url =  `${url_api}/api/mail_keywords`
    console.log(url);
    const response = await fetch(url);
    const responseBody = await response.json();
    console.log(responseBody.success);
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
