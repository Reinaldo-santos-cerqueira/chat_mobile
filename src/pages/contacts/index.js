import * as S from './styles.js'
import Logo from '../../../assets/logo.svg'
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Image, View } from 'react-native';
import { AllContacts, host, setTokenExpoRoute } from '../../utils/ApiRouter.js';
import axios from 'axios';
import { Item } from './item/index.js';
import { io } from 'socket.io-client'
import * as Notifications from 'expo-notifications';
export function Contacts({ navigation }) {
    const [imgURL,setImgUrl] = useState()
    const [username, setUsername] = useState()
    const [contacts, setContacts] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)
    const socket = useRef()

    useEffect(() => {
        (
            async () => {
                setImgUrl(await AsyncStorage.getItem('chat-user-avatarImage'))
                setUsername(await AsyncStorage.getItem('chat-user-username'))
            }
        )()
    }, [])

    useEffect(() => {
        (
            async () => {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    return;
                }

                let tokenExpo = (await Notifications.getExpoPushTokenAsync()).data;
                const email = await AsyncStorage.getItem('chat-user-email')
                console.log('====================================');
                console.log(tokenExpo);
                console.log('====================================');
                axios.patch(
                    `${setTokenExpoRoute}`,
                    {
                        email,
                        tokenExpo
                    }
                )
                    .then((resp) => {
                        console.log('====================================');
                        console.log(resp.data, tokenExpo);
                        console.log('====================================');
                    })
                    .catch((e) => {
                        console.log('====================================');
                        console.log(e);
                        console.log('====================================');
                    })
            }
        )()
    },[])

    useEffect(() => {
        if (AsyncStorage.getItem('chat-user-id')) {
            socket.current = io(host)
            socket.current.emit("add-user", AsyncStorage.getItem('chat-user-id'))
        }
    }, [])
    
    useEffect(() => {
        ( 
            async () => {
                const email = await AsyncStorage.getItem('chat-user-email')
                await axios.get(`${AllContacts}/${email}`)
                    .then((resp) => {
                        setContacts(resp.data.message)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        )()
    }, [])
    
    return (
        <S.Container>
            <S.AreaLogo>
                <Logo
                    height={75}
                    width={75}
                />
                <S.TextMain>
                    Snappy
                </S.TextMain>
            </S.AreaLogo>
            <S.Contacts>
                <FlatList
                    data={contacts}
                    renderItem={({ item }) => <Item item={item} navigation={navigation} />}
                    keyExtractor={item => item._id}
                    style={{ padding: 20 }}
                />
            </S.Contacts>
            <S.CurrentUser>
                <Image
                    
                    source={imgURL === '' ? { uri: 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg' } : { uri: imgURL }}
                    style={{ width: 75, height: 75, borderRadius: 37.5}}
                />
                <S.TextBottom>
                    {username}
                </S.TextBottom>
            </S.CurrentUser>
        </S.Container>
    );
}