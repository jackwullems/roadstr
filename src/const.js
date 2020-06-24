export const colors = {
    assert: '#12141B',
    background: '#1E2027',
    secondary: '#FF8F00'
}
export const theme = {
    colors: {
        primary: '#0D88FF',
        secondary: '#FF8F00'
    },
    Button: {
        titleStyle: {
            fontSize: 10,
            fontFamily: 'NotoSans-SemiBold'
        }
    },
}

const API_BASE_URL = 'https://dev.roadstr.io/api/v01'

export const API = {
    event_invitation: id=> API_BASE_URL+`/event/${id}/invitation`,
    event_invite: id=> API_BASE_URL+`/event/${id}/invite`,
}