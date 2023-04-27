import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as C from './styles'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatHeader = ({ data }) => {
  const navigation = useNavigation()
  const handleArrowLeft = () => {
    navigation.goBack() 
  }

  const handlePower = async () => {
    await AsyncStorage.clear()
    navigation.navigate('Login')
  }


  return (
    <C.Header>
      <TouchableOpacity>
        <AntDesign name="arrowleft" size={20} color="white" onPress={handleArrowLeft} />
      </TouchableOpacity>
      <Image
        source={data.avatarImage === '' ? { uri: 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg' } :{ uri: data.avatarImage }}
        style={{ width: 50,height: 50, borderRadius: 25 }}
      />
      <C.TextMain>
        {data.username}
      </C.TextMain>
      <TouchableOpacity
        onPress={handlePower}
      >
        <AntDesign name="poweroff" size={20} color="white" />
      </TouchableOpacity>
    </C.Header>
  )
}

export default ChatHeader