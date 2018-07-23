import STREAM_POST from '../sourceDatas/DataPost';

export default function (state = [], action) {
  switch (action.type) {
    case 'SELECT_POST':
      return STREAM_POST.filter(post => post.thread_id === action.payload.id);
    default :
      return state;
  }
}