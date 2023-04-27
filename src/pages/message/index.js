import { host, sendMessageRoute } from '../../utils/ApiRouter';
import ChatArea from '../../components/ChatArea/index.js';
import ChatHeader from '../../components/ChatHeader/index.js';
import ChatSendMessage from '../../components/ChatSendMessage/index.js'
import * as S from './styles.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { io } from 'socket.io-client'

export function Message({ route }) {
    const [messages, setMessages] = useState([])
    const socket = useRef()

    useEffect(() => {
        (
            async () => {
                console.log('====================================');
                console.log(1);
                console.log('====================================');
                if (await AsyncStorage.getItem('chat-user-id')) {
                    socket.current = io(host)
                    socket.current.emit("add-user", await AsyncStorage.getItem('chat-user-id'))
                }
            }
        )()
    }, [])

    const handleSendMsg = async (msg) => {
        if (msg === '') {
            alert('Insira uma mensagem')
            return;
        }
        axios.post(
            sendMessageRoute,
            {
                from: await AsyncStorage.getItem('chat-user-id'),
                to: route.params.datas._id,
                message: msg
            }
        )
            .then(() => {
                console.log('succes');
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message)
                } else if (error.request) {
                    alert(error.request.data.message)
                } else {
                    alert(error.data)
                    console.log(error);
                }
            })
        socket.current.emit("send-msg", {
            to: route.params.datas._id,
            from: await AsyncStorage.getItem('chat-user-id'),
            message: msg
        })

        const msgs = [...messages]

        msgs.push({ fromSelf: true, message: msg })

        setMessages(msgs)
    }
    return (
        <S.Container>
            <ChatHeader data={route.params.datas} />
            <ChatArea data={route.params.datas} messages={messages} setMessages={setMessages} socket={socket} />
            <ChatSendMessage handleSendMsg={handleSendMsg} />
        </S.Container>
    );
}