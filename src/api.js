import {API} from './const'
import store from './redux/store'

export default {
    invitation: eventID => {
        return new Promise((resolve, reject)=>{
            const url = API.event_invitation(eventID)
            fetch(url, {
                headers: {
                    tsec: store.getState().user.token
                }
            })
            .then((response) => response.json())
            .then(json=>{
                if (json.result == 'ok') {
                    resolve(json.data)
                    return
                }
                reject(json.data.msg.type)
            }).catch(error=>{
                reject(error.message)
            })
    
        })
    },
    invite: (eventID, userFollowers, followers, members, nearby, users) => {
        return new Promise((resolve, reject)=>{
            const url = API.event_invite(eventID)
            const body = JSON.stringify({
                userFollowers, followers, members, nearby, users
            })
            console.log('body:', body)
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    tsec: store.getState().user.token
                },
                body
            })
            .then((response) => {
                console.log('response:', response)
                return response.json()
            })
            .then(json=>{
                console.log('json:', json)
                if (json.result == 'ok') {
                    resolve(json.data)
                    return
                }
                reject(json.data.msg)
            }).catch(error=>{
                reject(error.message)
            })
    
        })

    }
}