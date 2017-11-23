import createStore from '@app/createStore';
import combineReducers from '@app/combineReducers';

var store;
var reducer;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function countReducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

describe('createStore', () => {

  beforeEach(() => {
    reducer = combineReducers({ count: countReducer });
    store = createStore(reducer);
  });

  it('exposes the public API', () => {
    const methods = Object.keys(store);

    expect(methods).toHaveLength(3);
    expect(methods).toContain('dispatch');
    expect(methods).toContain('getState');
    expect(methods).toContain('subscribe');
  });

  it('dispatches an action and update the state accordingly', () => {
    store.dispatch({ type: INCREMENT });
    expect(store.getState()).toEqual({ count: 1 });
    
    store.dispatch({ type: DECREMENT });
    store.dispatch({ type: DECREMENT });
    expect(store.getState()).toEqual({ count: -1 });
  });

  it('returns the state correctly', () => {
    store = createStore(reducer);
    expect(store.getState()).toBeUndefined();

    store = createStore(reducer, { count: 1 });
    expect(store.getState()).toMatchObject({ count: 1 });
  });

  it('call subscribers on each dispatch', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    store.subscribe(listener1);
    store.subscribe(listener2);

    store.dispatch({ type: INCREMENT });
    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
    
    store.dispatch({ type: DECREMENT });
    expect(listener1).toHaveBeenCalledTimes(2);
    expect(listener2).toHaveBeenCalledTimes(2);
  });

  it('let subscribers unsubscribe', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    
    const unsub1 = store.subscribe(listener1);
    const unsub2 = store.subscribe(listener2);
    
    unsub2();

    store.dispatch({ type: INCREMENT });
    expect(listener1).toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
    
    unsub1();

    store.dispatch({ type: DECREMENT });
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(0);
  });

});