import { combineReducers } from 'redux';
import DataPost from './DataPost';
import DataThread from './DataThread';
import SelectPostOfThread from './selectPostOfThread';
import selectPostOfThread from './selectPostOfThread';

const reducer = combineReducers({
  threads: DataThread,
  postOfThread: selectPostOfThread
});

export default reducer;