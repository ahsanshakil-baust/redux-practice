import { createStore, bindActionCreators, combineReducers } from "redux";
import { produce } from "immer";

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const CAKE_STATUS = "CAKE_STATUS";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// Action
const orderCake = (qty = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
};

const restockCake = (qty = 1) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const orderIceCream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};

const restockIceCream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};

const statusOfCake = (status) => {
  return {
    type: CAKE_STATUS,
    payload: status,
  };
};

const cakeState = {
  numberOfCakes: 10,
  nameOfCake: {
    typeOfCake: {
      isOk: true,
    },
  },
};

const iceCreamState = {
  numberOfIceCream: 20,
};

// Reducer
const cakeReducer = (state = cakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - action.payload,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };

    case CAKE_STATUS:
      return produce(state, (draft) => {
        draft.nameOfCake.typeOfCake.isOk = action.payload;
      });

    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - action.payload,
      };

    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream + action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

export const store = createStore(rootReducer);

const unSubscribe = store.subscribe(() =>
  console.log("Updated State : ", store.getState())
);

// store.dispatch(orderCake(2));
// store.dispatch(orderCake(1));
// store.dispatch(orderCake(5));
// store.dispatch(restockCake(10));

const actions = bindActionCreators(
  { orderCake, restockCake, statusOfCake, orderIceCream, restockIceCream },
  store.dispatch
);

actions.orderCake(3);
actions.orderCake(5);
actions.restockCake(10);
actions.statusOfCake(false);

actions.orderIceCream(30);
actions.orderIceCream(5);
actions.restockIceCream(20);

unSubscribe();
