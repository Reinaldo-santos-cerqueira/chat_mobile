import styled from 'styled-components/native'

export const AreaMessage = styled.View`
    flex: 1;
    width: 100%;
`

export const AreaReceived = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px;
    align-items: center;
`

export const AreaSended = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px;
    align-items: center;
`

export const CardMessageReceived = styled.View`
    background-color: #9900ff20;
    border-radius: 20px;
    padding: 15px 20px;
`

export const CardMessageSended = styled.View`
    background-color: #4f04ff21;
    border-radius: 20px;
    padding: 15px 20px;
`

export const TextMessage = styled.Text`
    color: #f1f1f1;
    font-size: 20px;
`
