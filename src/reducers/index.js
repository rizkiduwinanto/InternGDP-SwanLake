import { combineReducers } from 'redux';
import ReducerDataPost from './reducerPost';
import ReducerDataPostOfThread from './reducerPostOfThread';
import ReducerDataThread from './reducerThread';

export default combineReducers({
  posts: ReducerDataPost,
  postsOfThread : ReducerDataPostOfThread,
  threads: ReducerDataThread
});