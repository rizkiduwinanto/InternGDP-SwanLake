import { combineReducers } from 'redux';
import reducerDataPost from './reducerPost';
import reducerDataPostOfThread from './reducerPostOfThread';
import reducerSelectedForum from './reducerSelectedForum';
import reducerFrequent from './reducerFrequent';
import reducerWordcloud from './reducerWordcloud';
import reducerTimeseries from './reducerTimeseries';
import reducerThread from './reducerThread';
import reducerKeyword from './reducerKeyword';

export default combineReducers({
  posts: reducerDataPost,
  postsOfThread : reducerDataPostOfThread,
  selectedForum: reducerSelectedForum,
  frequent: reducerFrequent,
  wordcloud: reducerWordcloud,
  timeseries: reducerTimeseries,
  thread: reducerThread,
  keyword: reducerKeyword
});
