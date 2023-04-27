import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as C from './styles'
import { MaterialIcons } from '@expo/vector-icons'; 


const ChatSendMessage = ({ handleSendMsg }) => {
  const [msg,setMsg] = useState('')
  const sendChat = () => {
    if (msg === '') {
      alert('Please enter message')
      return
    }
    if (msg.length > 0) {

      handleSendMsg(msg)

      setMsg('')

    }

  } 

  return (
    <C.AreaSend>
      <C.TextInput
        placeholder={"Please enter your message"}
        placeholderTextColor="#FFF"
        inputMode='email'
        onChangeText={setMsg}
        value={msg}
      />
      <C.AreaIcon
        onPress={sendChat}
      >
        <MaterialIcons name="send" size={24} color="white" />
      </C.AreaIcon>
    </C.AreaSend>
  )
}

export default ChatSendMessage