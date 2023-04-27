import styled from 'styled-components/native'

export const  Container = styled.View`
    flex: 1;
    background-color: #131324;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Form = styled.View`
    width: 90%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:50px 30px;
    background-color: #00000076;
    border-radius: 20px;
    gap:36px;
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

export const TextSecondary = styled.Text`
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
`

export const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    border: 1px solid #4e0eff;
    color: white;
    border-radius: 10px;
    padding: 5px 10px;
`

export const ButtonArea = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: #4e0eff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AreaButtonOnlyText = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

export const ButtonOnlyText = styled.TouchableOpacity`

`
export const TextButtonOnlyText = styled.Text`
    color: #4e0eff;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 900;
`