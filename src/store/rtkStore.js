import { configureStore } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import cakeReducer, { orderCake, restockCake } from "@/store/feature/cakeSlice";
import iceCreamReducer, {
  changeIceCreamColor,
  changeIceCreamName,
  orderIceCream,
  restockIceCream,
} from "@/store/feature/iceCreamSlice";
import userReducer, { fetchUsers } from "@/store/feature/userSlice";

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
  },
});

// const unSubscribe = store.subscribe(() =>
//   console.log("Updated State: ", store.getState())
// );

const unSubscribe = store.subscribe(() => {
  // console.log("Updated State: ", store.getState());
  if (!store.getState().user.loading) {
    unSubscribe();
  }
});

const actions = bindActionCreators(
  {
    orderCake,
    restockCake,
    orderIceCream,
    restockIceCream,
    changeIceCreamColor,
    changeIceCreamName,
    fetchUsers,
  },
  store.dispatch
);

// actions.orderCake(15);
// actions.restockCake(20);
// actions.orderIceCream(5);
// actions.changeIceCreamColor("blue");
// actions.changeIceCreamName("private");

// actions.fetchUsers();

// unSubscribe();

export default store;
