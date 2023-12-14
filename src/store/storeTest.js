import { createStore } from "redux";
import { produce } from "immer";
import { bindActionCreators } from "redux";

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const CAKE_AVAILABLE = "CAKE_AVAILABLE";

const orderCake = (qty = 1) => {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
};

const restockCake = (qty = 10) => {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};

const availableCake = (status) => {
  return {
    type: CAKE_AVAILABLE,
    payload: status,
  };
};

const initialState = {
  cake: {
    available: true,
    numOfCake: 15,
  },
  iceCream: {
    available: false,
    numOfIceCream: 0,
  },
};

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return produce(state, (draft) => {
        draft.cake = {
          numOfCake: draft.cake.numOfCake - action.payload,
          available: draft.cake.numOfCake - action.payload <= 0 ? false : true,
        };
      });

    // return {
    //   ...state,
    //   cake: {
    //     ...state.cake,
    //     numOfCake: state.cake.numOfCake - action.payload,
    //     available: state.cake.numOfCake - action.payload <= 0 ? false : true,
    //   },
    // };

    case CAKE_RESTOCKED:
      return produce(state, (draft) => {
        draft.cake = {
          numOfCake: draft.cake.numOfCake + action.payload,
          available: draft.cake.numOfCake + action.payload <= 0 ? false : true,
        };
      });

    case CAKE_AVAILABLE:
      return produce(state, (draft) => {
        draft.cake.available = action.payload;
      });

    default:
      return state;
  }
};

export const store = createStore(cakeReducer);

const unsubscribe = store.subscribe(() =>
  console.log("Updated State : ", store.getState())
);

const actions = bindActionCreators(
  {
    orderCake,
    restockCake,
    availableCake,
  },
  store.dispatch
);
// store.dispatch(orderCake(15));
// store.dispatch(restockCake(6));

actions.orderCake(15);
actions.restockCake(6);

unsubscribe();
