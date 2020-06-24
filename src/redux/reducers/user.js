import {LOGIN, LOGOUT, SETSKIPGUIDE} from '../actions'

const initUser = {

}

export default (state=initUser, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        default:
            return state
    }
}