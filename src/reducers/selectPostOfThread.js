import * as type from '../constants';

export default function(state = [], action) {
  switch (action.type) {
    case type.SELECT_POST:
      return action.posts
    default:
      return state
  }
}