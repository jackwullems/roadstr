import React, { useEffect } from 'react'
import {SafeAreaView} from 'react-native'
import { Button } from 'react-native-elements'
import {login} from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'

export default ({navigation}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(login({token: '2::eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlc3Npb25JZCI6IjVlZjIyZGJjNjlmZGMyMzQyZDQ1YzkzOCJ9LCJpYXQiOjE1OTI5Mjk3MjQsImV4cCI6MTU5MzAxNjEyNCwiYXVkIjoiVXNlclNlc3Npb25JZGVudGl0eSIsImlzcyI6ImNvbS5yb2Fkc3RyLmJhY2tlbmQiLCJzdWIiOiJzZXNzaW9uOjVlZjIyZGJjNjlmZGMyMzQyZDQ1YzkzOCJ9.cr6qrEOyyqBYDR9vtpl6A-8arDVEW55qDcxwYXcZZ5jiqDTP9gdeweZWfT5E2WqFASQx_jOTGbulZqlp3YZD-Q'}))
    }, [])
    const user = useSelector(state => state.user)
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {
                user.token &&                
                <Button
                    title='go to invitation'
                    onPress={()=>navigation.push('invite', {eventID: '5b179ba6cdf053001445acb3'})}/>
            }
        </SafeAreaView>
    )
}