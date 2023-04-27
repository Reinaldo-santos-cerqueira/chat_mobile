import * as S from './styles.js'
import Logo from '../../../assets/logo.svg'
import axios from 'axios'
import { LoginRoute } from '../../utils/ApiRouter.js';
import { useEffect, useState } from 'react';
import { passwordStrength } from 'check-password-strength'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Login({navigation}) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [att, setAtt] = useState(true)

    const login = async () => {
        if (handleValidation()) {
            await axios.post(
                LoginRoute, {
                email,
                password
            }
            ).then(async (resp) => {

                await AsyncStorage.setItem('chat-user-email', resp.data.message.email)
                await AsyncStorage.setItem('chat-user-id', resp.data.message.id)
                await AsyncStorage.setItem('chat-user-username', resp.data.message.username)
                await AsyncStorage.setItem('chat-user-avatarImage', resp.data.message.avatarImage)
                await AsyncStorage.setItem('chat-user-password', password)
                setEmail('')
                setPassword('')
                if (resp.data.message.avatarImage !== '' ) {
                    navigation.navigate('Contacts')
                } else {
                    navigation.navigate('SetAvatar')
                }
            }).catch((error) => {
                
                if (error.response) {
                    alert(error.response.data.message)
                } else if (error.request) {
                    alert(error.request.data.message)
                } else {
                    alert(error.data)
                    console.log(error);
                }
            })

        }

    }

    useEffect(() => {
        (
            async () => {
                if (await AsyncStorage.getItem('chat-user-email') !== '' && await AsyncStorage.getItem('chat-user-password') !== '') {
                    navigation.navigate('SetAvatar')
                }
            }
        )()
    }, [att])

    const handleValidation = () => {
        const passwordWeight = passwordStrength(password).value
        if (email === '') {
            alert(
                "Please enter valid email",
            )
        } else if (password.length < 10) {
            alert(
                "Password should be greater than 10 characters",
            )
            return false
        } else if (passwordWeight !== 'Strong') {
            alert(
                "Password should be strong",
            )
            return false
        }
        return true
    }


    const goRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <S.Container>
            <S.Form>
                <S.AreaLogo>
                    <Logo
                        height={75}
                        width={75}
                    />
                    <S.TextMain>
                        Snappy
                    </S.TextMain>
                </S.AreaLogo>
                <S.Input
                    placeholder="Please enter on email"
                    placeholderTextColor="#FFF"
                    inputMode='email'
                    onChangeText={setEmail}
                    value={email}
                />
                <S.Input
                    placeholder="Please enter on password"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <S.ButtonArea
                    onPress={login}
                >
                    <S.TextMain>
                        Login
                    </S.TextMain>
                </S.ButtonArea>
                <S.AreaButtonOnlyText>
                    <S.TextSecondary>
                        Don't have an account?
                    </S.TextSecondary>
                    <S.ButtonOnlyText
                        onPress={goRegister}
                    >
                        <S.TextButtonOnlyText>
                            Click here
                        </S.TextButtonOnlyText>
                    </S.ButtonOnlyText>
                </S.AreaButtonOnlyText>
            </S.Form>
        </S.Container>
    );
}