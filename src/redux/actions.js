export const LOGIN = 'login'
export const LOGOUT = 'logout'

export const login = user => {
    return {
        type: LOGIN,
        payload: user
    }
}
