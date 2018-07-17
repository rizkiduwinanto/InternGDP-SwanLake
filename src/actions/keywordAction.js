export const fetchEmail = () => async (dispatch, getState, url_api) => {
  try {
    const url =  `${url_api}/api/keyword_mail_addr`
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch();
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
    const url =  `${url_api}/api/mail_keyword`
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch();
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