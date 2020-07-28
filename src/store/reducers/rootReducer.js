import authReducer from './authReducer'
import userReducer from './userReducer'
import profileReducer from './profileReducer'
import productReducer from './productReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    product: productReducer,
})

export default rootReducer