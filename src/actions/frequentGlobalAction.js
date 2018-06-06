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

export function fetchFrequentGlobal(since, until) {
  return function(dispatch) {
    return fetch(`http://localhost:3001/api/frequent-poster/${since}/${until}`)
      .then(res => res.json())
      .then(data => dispatch(receiveFrequentGlobal(data)))
      .catch(err => dispatch(errorFrequentGlobal(err)))
  }
}

