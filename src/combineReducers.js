export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    const keys = Object.keys(reducers);
    const nextState = {};

    keys.forEach((key, index) => {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
    });

    return nextState;
  }
}