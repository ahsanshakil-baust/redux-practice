import { configureStore } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import cakeReducer, { orderCake, restockCake } from "@/store/feature/cakeSlice";
import iceCreamReducer, {
  changeIceCreamColor,
  changeIceCreamName,
  orderIceCream,
  restockIceCream,
} from "@/store/feature/iceCreamSlice";

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
  },
});

const unSubscribe = store.subscribe(() =>
  console.log("Updated State: ", store.getState())
);

const actions = bindActionCreators(
  {
    orderCake,
    restockCake,
    orderIceCream,
    restockIceCream,
    changeIceCreamColor,
    changeIceCreamName,
  },
  store.dispatch
);

actions.orderCake(15);
// actions.restockCake(20);
// actions.orderIceCream(5);
// actions.changeIceCreamColor("blue");
// actions.changeIceCreamName("private");

unSubscribe();

export default store;
