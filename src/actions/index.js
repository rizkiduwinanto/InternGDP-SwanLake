import * as type from '../constants';

function selectPost(posts) {
  return {
    type: type.SELECT_POST,
    payload: posts
  }
}

export default selectPost;

