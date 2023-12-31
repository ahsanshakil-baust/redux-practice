import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const fetchUsersaRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersaSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersaFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersaRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersaSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersaFailure(error.message));
      });
  };
};

// const rootReducer = combineReducers({
//   users: userReducer,
// });

export const store = createStore(userReducer, applyMiddleware(thunk));
// store.subscribe(() => console.log(store.getState()));
// store.dispatch(fetchUsers());
