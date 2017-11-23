import combineReducers from '@app/combineReducers';

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

const TOGGLE = 'TOGGLE';

function toggleReducer(state = false, action) {
  if (action.type === TOGGLE) {
    return !state;
  } else {
    return state;
  }
}

describe('combineReducers', () => {

  beforeEach(() => {
    reducer = combineReducers({
      count: countReducer,
      toggle: toggleReducer,
    });
  });

  it('combines a object of reducers into a single reducer function', () => {
    expect(reducer).toBeDefined();
    expect(typeof reducer === 'function').toBeTruthy();
  });

  it('runs internal reducers and returns the correct state for each keys', () => {
    const state1 = reducer(undefined, { type: INCREMENT });
    expect(state1).toHaveProperty('toggle', false);
    expect(state1).toHaveProperty('count', 1);

    const state2 = reducer(undefined, { type: TOGGLE });
    expect(state2).toHaveProperty('toggle', true);
    expect(state2).toHaveProperty('count', 0);
  });

});