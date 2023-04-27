import * as S from './styles.js'
import Logo from '../../../assets/logo.svg'
import { useEffect, useState } from 'react';
import toonavatar from 'cartoon-avatar'
import { View } from 'react-native'
import { Item } from './item/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { SetAvatarRoute } from '../../utils/ApiRouter.js';

export function SetAvatar({navigation}) {
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [urlSet, setUrlSet] = useState('')
    const [att, setAtt] = useState()
    
    const loadImgs = () => {

        const data = []
        let url = ''
        for (let i = 0; i < 4; i++) {
            if (i > 1) {
                url = toonavatar.generate_avatar({ "gender": "male" })
            } else {
                url = toonavatar.generate_avatar({ "gender": "female" })
            }
            data.push({
                id: i,
                url: url
            })
        }

        setAvatars(data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadImgs()
    }, [att])

    useEffect(() => {
        (
            async () => {
                console.log('====================================');
                console.log(await AsyncStorage.getItem('chat-user-avatarImage'));
                console.log('====================================');
                if (await AsyncStorage.getItem('chat-user-avatarImage') !== null) {
                    navigation.navigate('Contacts')
                }
            }
        )()

    }, [att])

    const handleClick = async () => {
        const email = await AsyncStorage.getItem('chat-user-email')
        console.log('====================================');
        console.log(email);
        console.log('====================================');
        axios.patch(
            SetAvatarRoute,
            {
                email: email,
                imgURL: urlSet
            }
        )
            .then( async (resp) => {
                await AsyncStorage.setItem('chat-user-avatarImage', urlSet)
                navigation.navigate('Contacts')
            })
            .catch((error) => {
                console.log('====================================');
                console.log(1);
                console.log('====================================');
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
            <S.FlatAvatar
                data={avatars}
                renderItem={({ item }) => <Item item={item} setUrlSet={setUrlSet} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 50 }} />}
            />
            <S.ButtonSet
                onPress={handleClick}
            >
                <S.TextMain>
                    Set avatar
                </S.TextMain>
            </S.ButtonSet>
        </S.Container>
    );
}