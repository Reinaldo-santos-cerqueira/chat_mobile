import { FlatList, ActivityIndicator, AppState } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { getAllMessageRoute } from '../../utils/ApiRouter'

const ChatArea = ({ data, messages, setMessages,socket }) => {
  const [loading, setLoading] = useState(false)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [att, setAtt] = useState(true)
  const flatListRef = useRef(null);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);



  useEffect(() => {
    (
      async () => {
        const response = await axios.post(getAllMessageRoute, {
          from: await AsyncStorage.getItem('chat-user-id'),
          to: data._id,
        })
        setMessages(response.data)
        setLoading(!loading)
        const socketValid = await socket.current
        if (socketValid) {
          console.log('====================================');
          console.log('passou');
          console.log('====================================');
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
      }
    )()
  }, [])

  useEffect(() => {
    (
      async () => {

      }
    )()
  }, [att]);
  return (
    <S.AreaMessage>
      {
        loading === false  && messages.length === 0
          ?
            <ActivityIndicator size="large" color="#fff"
              style={{
                position: 'absolute',
                top: '50%',
                left: '40%'
              }}
            />
          :
            ''
      }
      <FlatList
        ref={flatListRef}
        data={messages}
        onContentSizeChange={() => {
          if (messages.length > 0) {
            if (flatListRef.current) {

              flatListRef?.current?.scrollToEnd();

            }
            
          }
        }}
        renderItem={({ item }) => {
          if (!item.fromSelf) {
            return (
              <S.AreaReceived>
                <S.CardMessageSended>
                  <S.TextMessage>
                    {item.message}
                  </S.TextMessage>
                </S.CardMessageSended>
              </S.AreaReceived>
            )
          }
          return (
            <S.AreaSended>
              <S.CardMessageReceived>
                <S.TextMessage>
                  {item.message}
                </S.TextMessage>
              </S.CardMessageReceived>
            </S.AreaSended>
          )
        }}
        style={{ paddingLeft:20, paddingRight: 20 }}
      />
    </S.AreaMessage>
  )
}

export default ChatArea