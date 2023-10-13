import { createStore, applyMiddleware } from "redux";
// 用于支持异步action
import thunk from "redux-thunk";
import { reducer } from "./index";

export default createStore(reducer, applyMiddleware(thunk));
