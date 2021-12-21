import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginReducer } from "../Reducer/LoginReducer";
import { dipartmentReducer } from "../Reducer/importantdataReducer";
import { registationReducer } from "../Reducer/registationReducer";

const reducer = combineReducers({
    userLoginstatus: loginReducer,
    dipartMent: dipartmentReducer,
    registation: registationReducer,
})

const initialState  = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store