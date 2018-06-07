import convertDate from '../converterDate';

export function updateSinceFrequentGlobal(since) {
  return {
    type: 'SINCE_FREQUENT_GLOBAL',
    since
  };
}

export function updateUntilFrequentGlobal(until) {
  return {
    type: 'UNTIL_FREQUENT_GLOBAL',
    until
  };
}

export function errorFrequentGlobal(err) {
  return {
    type: 'ERROR_FREQUENT_GLOBAL',
    err
  };
}

export function receiveFrequentGlobal(data){
  return {
    type: 'RECEIVE_FREQUENT_GLOBAL',
    data
  };
}

// export function fetchFrequentGlobal(since, until) {
//   return function(dispatch) {
//     return fetch(`http://localhost:3001/api/frequent-poster/${since}/${until}`)
//       .then(res => res.json())
//       .then(data => dispatch(receiveFrequentGlobal(data)))
//       .catch(err => dispatch(errorFrequentGlobal(err)))
//   }
// }

export const fetchFrequentGlobal = (since, until) => async dispatch => {
  try {
    const sinceConverted = convertDate(since);
    const untilConverted = convertDate(until);
    const url = `http://localhost:3001/api/frequent-poster/${sinceConverted}/${untilConverted}`;
    const response = await fetch(url);
    const responseBody = await response.json();
    dispatch(receiveFrequentGlobal(responseBody));
  } catch(error) {
    console.log(error);
  }
}
