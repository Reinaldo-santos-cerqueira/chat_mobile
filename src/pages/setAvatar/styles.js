import styled from 'styled-components/native'

export const  Container = styled.View`
    flex: 1;
    background-color: #131324;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 30px 0;
`

export const AreaLogo = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 36px;
    align-items: center;
    justify-content: center;
`
export const TextMain = styled.Text`
    color: #fff;
    font-size: 25px;
    text-transform: uppercase;
    font-weight: 900;
`
export const FlatAvatar = styled.FlatList`
    padding-top: 30px;
`

export const ButtonSet = styled.TouchableOpacity`
    background-color: #4e0eff88;
    padding:10px 20px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
`
