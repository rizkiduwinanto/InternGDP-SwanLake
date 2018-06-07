import { combineReducers } from 'redux';
import ReducerDataPost from './reducerPost';
import ReducerDataPostOfThread from './reducerPostOfThread';
import ReducerDataThread from './reducerThread';
import ReducerFrequent from './reducerFrequent';

export default combineReducers({
  posts: ReducerDataPost,
  postsOfThread : ReducerDataPostOfThread,
  threads: ReducerDataThread,
  frequent: ReducerFrequent
});
