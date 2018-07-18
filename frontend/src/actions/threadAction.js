export default function selectPost(thread) {
  return {
    type: 'SELECT_POST',
    payload: thread
  }
}