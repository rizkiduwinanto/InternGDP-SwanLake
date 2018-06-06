import { combineReducers } from 'redux';
import ReducerDataPost from './reducerPost';
import ReducerDataPostOfThread from './reducerPostOfThread';
import ReducerDataThread from './reducerThread';
import ReducerFrequentGlobal from './reducerFrequentGlobal';
import ReducerRequestFrequentGlobal from './reducerRequestFrequentGlobal';

export default combineReducers({
  posts: ReducerDataPost,
  postsOfThread : ReducerDataPostOfThread,
  threads: ReducerDataThread,
  frequentGlobal: ReducerFrequentGlobal,
  requestFrequentGlobal: ReducerRequestFrequentGlobal
});
