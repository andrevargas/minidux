export default function createStore(reducer, preloadedState) {
  let currentState = preloadedState;
  const subscriptions = [];

  return {
    dispatch(action) {
      currentState = reducer(currentState, action);
      subscriptions.forEach(fn => fn(currentState));
    },

    getState() {
      return currentState;
    },

    subscribe(listener) {
      subscriptions.push(listener);
      return () => {
        subscriptions.splice(subscriptions.indexOf(listener), 1);
      }
    }
  }
}