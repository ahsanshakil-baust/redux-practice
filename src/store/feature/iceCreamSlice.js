import { createSlice } from "@reduxjs/toolkit";
import { orderCake } from "./cakeSlice";

const initialState = {
  numOfIceCream: 25,
  color: {
    name: "local",
    type: {
      status: "green",
    },
  },
};

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    orderIceCream: (state, action) => {
      state.numOfIceCream -= action.payload;
    },

    restockIceCream: (state, action) => {
      state.numOfIceCream += action.payload;
    },

    changeIceCreamColor: (state, action) => {
      state.color.type.status = action.payload;
    },
    changeIceCreamName: (state, action) => {
      state.color.name = action.payload;
    },
  },
  // extraReducers: {
  //   ["cake/ordered"]: (state, action) => {
  //     state.numOfIceCreams -= action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(orderCake, (state, action) => {
      state.numOfIceCream -= action.payload;
    });
  },
});

export const {
  orderIceCream,
  restockIceCream,
  changeIceCreamColor,
  changeIceCreamName,
} = iceCreamSlice.actions;

export default iceCreamSlice.reducer;
