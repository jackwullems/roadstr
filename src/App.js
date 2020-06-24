import React from 'react'
import { persistStore } from 'redux-persist'
import { Provider, useSelector } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import {StatusBar} from 'react-native'
import { ThemeProvider, Button } from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import store from './redux/store'
import MainScreen from './screens/MainScreen'
import InviteScreen from './screens/InviteScreen'
import {theme, colors} from './const'

const Stack = createStackNavigator()
console.disableYellowBox = true

const persistor = persistStore(store)

const navigationHeaderOptions = {
    headerStyle: {
        backgroundColor: colors.assert,
        elevation: 1,
        borderBottomWidth: 0
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        fontFamily: 'NotoSans-Medium',
        fontSize: 18
    }
}

const StackNavigator = () => {
    const lang = useSelector(state => state.lang)
    return (
        <Stack.Navigator
            screenOptions={navigationHeaderOptions}>
            <Stack.Screen
                name='main'
                component={MainScreen} />
            <Stack.Screen
                name='invite'
                component={InviteScreen}
                options={{
                    title: lang.invite,
                    headerRight: ()=>(
                        <Button
                            title={lang.invitebylink}
                            // type='outline'
                            buttonStyle={{backgroundColor: colors.assert, paddingVertical: 8, paddingHorizontal: 10}}
                            containerStyle={{borderColor: colors.secondary, borderWidth: 1, borderRadius: 5, marginRight: 10}}
                            titleStyle={{color: colors.secondary, letterSpacing: 1}}/>
                    )
                }}/>
        </Stack.Navigator>
    )
}
export default () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <NavigationContainer>
                        <StatusBar backgroundColor={colors.assert}/>
                        <StackNavigator/>
                    </NavigationContainer>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}