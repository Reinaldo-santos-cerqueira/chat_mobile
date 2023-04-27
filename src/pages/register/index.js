import * as S from './styles.js'
import Logo from '../../../assets/logo.svg'
import axios from 'axios'
import { RegisterRoute } from '../../utils/ApiRouter.js';
import { useState } from 'react';
import { passwordStrength } from 'check-password-strength'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Register({navigation}) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    const login = async () => {
        if (handleValidation()) {
            await axios.post(
                RegisterRoute, {
                email,
                password,
                username
            }
            ).then(async (resp) => {
                navigation.navigate('Login')
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


    const goLogin = () => {
        navigation.navigate('Login')
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
                    placeholder="Please enter on username"
                    placeholderTextColor="#FFF"
                    onChangeText={setUsername}
                    value={username}
                />
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
                        Register
                    </S.TextMain>
                </S.ButtonArea>
                <S.AreaButtonOnlyText>
                    <S.TextSecondary>
                        Do you have a account?
                    </S.TextSecondary>
                    <S.ButtonOnlyText
                        onPress={goLogin}
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