import { receiveForumList } from '../actions/frequentPerForumAction';

export const fetchForumList = () => async (dispatch, getState, url_api) => {
  try {
    const url = `${url_api}/api/forum_list`
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveForumList(responseBody));
  } catch(error) {
    console.log(error);
  }
}

export const selectThread = (forum) => async (dispatch, getState, url_api) => {
  try {
    
  } catch(error) {
    console.log(error);
  }
}