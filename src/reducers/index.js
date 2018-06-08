import { combineReducers } from 'redux';
import reducerDataPost from './reducerPost';
import reducerDataPostOfThread from './reducerPostOfThread';
import reducerDataThread from './reducerThread';
import reducerFrequent from './reducerFrequent';
import reducerWordcloud from './reducerWordcloud';
import reducerTimeseries from './reducerTimeseries';

export default combineReducers({
  posts: reducerDataPost,
  postsOfThread : reducerDataPostOfThread,
  threads: reducerDataThread,
  frequent: reducerFrequent,
  wordcloud: reducerWordcloud,
  timeseries: reducerTimeseries
});
