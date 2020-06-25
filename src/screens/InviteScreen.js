import React, {useEffect} from 'react'
import {SafeAreaView, FlatList, View, Text, TouchableOpacity, Platform} from 'react-native'
import { SearchBar, ListItem, Button, Avatar, withTheme } from 'react-native-elements'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import Toast from 'react-native-simple-toast'
import {BallIndicator} from 'react-native-indicators'

import {colors} from '../const'
import api from '../api'

export default withTheme(({theme, navigation, route}) => {
    const {eventID} = route.params
    const [loading, setLoading] = useState(true)
    const [srchTxt, setsrchTxt] = useState('')
    const [allItems, setallItems] = useState([])
    const lang = useSelector(state => state.lang)
    const handleRenderItem = ({item}) => {
        return (
            <UserCard item={item}/>
        )
    }
    const UserCard = ({item}) => {
        const [role, setRole] = useState(item.role)
        const getInvitingStatus = role => {
            switch (role) {
                case 0:
                    return lang.capInvite
                case 1:
                    return lang.capOwner
                case 2:
                    return lang.capAttending
                case 3:
                    return lang.capInvited
                default:
                    return ''
            }
        }
        const [loading, setLoading] = useState(false)
        const handleInvite = () => {
            setLoading(true)
            api.invite(eventID, false, false, false, false, [item._id])
            .then(data=>{
                setLoading(false)
                setRole(3)
                Toast.show('Invite sent')
            })
            .catch(msg=>{
                setLoading(false)
                setRole(3)
                Toast.show(msg)
            })
        }
        const shadowStyle = role==0?{shadowColor: 'black', shadowOffset: {width: 0, height: 5}, elevation: 10, shadowOpacity: 0.5}:{}
        return (
            <View
                style={{borderRadius: 5, flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'white'}}
                // title={item.username}
                // subtitle={item.fullName}
                // leftElement={item.profilePhoto?<Avatar size='large' rounded title={item.username[0]} source={{uri: item.profilePhoto}}/>:<Avatar rounded size='large' title={item.username[0]}/>}
                // rightElement={<Button title={lang.capInvite}/>}
                key={item._id}>
                {item.profilePhoto?<Avatar size='medium' rounded title={item.username[0]} source={{uri: item.profilePhoto}}/>:<Avatar rounded size='large' title={item.username[0]}/>}
                <View style={{flexDirection: 'column', justifyContent: 'center', flex: 1, marginLeft: 10}}>
                    <Text style={{textAlign: 'left', fontSize: 14, fontFamily: 'NotoSans-SemiBold', marginRight: 10}} numberOfLines={1} ellipsizeMode='tail'>{item.username}</Text>
                    <Text style={{textAlign: 'left', fontSize: 12, fontFamily: 'NotoSans-Regular', marginRight: 10}} numberOfLines={1} ellipsizeMode='tail'>{item.fullName}</Text>
                    {
                        item.isNearby &&
                        <TouchableOpacity>
                            <Text style={{textAlign: 'left', color: theme.colors.secondary, fontSize: 11, fontFamily: 'NotoSans-Medium'}}>{lang.nearby}</Text>
                        </TouchableOpacity>
                    }
                </View>
                {
                    Platform.OS == 'ios'
                    ?
                    <View style={shadowStyle}>
                    <Button
                        buttonStyle={{borderRadius: 5, paddingHorizontal: 20, paddingVertical: 8}}
                        // containerStyle={shadowStyle}
                        onPress={handleInvite}
                        disabled={role!=0}
                        loading={loading}
                        titleStyle={{letterSpacing: 1}}
                        title={getInvitingStatus(role)}/>
                    </View>
                    :
                    <Button
                        buttonStyle={{borderRadius: 5, paddingHorizontal: 20, paddingVertical: 8}}
                        containerStyle={shadowStyle}
                        onPress={handleInvite}
                        disabled={role!=0}
                        loading={loading}
                        titleStyle={{letterSpacing: 1}}
                        title={getInvitingStatus(role)}/>

                    }
            </View>
        )
    }
    useEffect(() => {
        api.invitation(eventID)
        .then(data=>{
            setLoading(false)
            setallItems(data.users)
        })
        .catch(msg=>{
            setLoading(false)
            Toast.show(msg)
        })
    }, [])
    const items = allItems.filter(item=>{
        if (srchTxt) {
            if (item.username.includes(srchTxt)) {
                return true
            }
            return false
        }
        return true
    })
    const handleDone = () => {
        navigation.goBack()
    }
    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: colors.background}}>
            <SearchBar
                containerStyle={{backgroundColor: colors.assert, margin: 0, borderTopWidth: 0, borderBottomWidth: 0}}
                inputContainerStyle={{height: 35, backgroundColor: colors.background}}
                inputStyle={{fontSize: 13}}
                value={srchTxt}
                onChangeText={txt=>setsrchTxt(txt)}
                placeholder={lang.search}/>
            {
                loading
                ?
                <BallIndicator/>
                :
                <FlatList
                    style={{backgroundColor: colors.background, margin: 10}}
                    keyExtractor={item=>item._id}
                    renderItem={handleRenderItem}
                    ItemSeparatorComponent={()=><View style={{height: 10}}/>}
                    data={items}/>

            }
            <Button
                buttonStyle={{backgroundColor: colors.secondary, paddingVertical: 19, borderRadius: 0}}
                containerStyle={{borderRadius: 0}}
                onPress={handleDone}
                titleStyle={{fontSize: 16, letterSpacing: 3}}
                title={lang.done}/>
        </SafeAreaView>
    )
})