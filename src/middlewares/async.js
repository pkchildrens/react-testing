export default ({ dispatch }) => next => action => {
  // check to see if the action has a promise on its 'payload' property
  // if it does, wait for it to resolve
  // if it doesn't, send the action on to the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action)
  }

  // we want to wait for the promise to resolve
  // (get the data) and then create a new action
  // with that data and dispatch it
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response }
    dispatch(newAction)
  })
}
