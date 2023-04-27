import { useContext, useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../context/ContextApi";

export const Item = ({ item, setUrlSet }) => {

    const [borderColor, setBorderColor] = useState('transparent')
    const { borderState, setBorderState } = useContext(AuthContext)

    useEffect(() => {
        setBorderColor('transparent')
    }, [borderState])
    return (
        <TouchableOpacity
            onPress={() => {
                setBorderState(!borderState)
                setTimeout(() => {
                    setUrlSet(item.url)
                    if (borderColor === 'transparent') {
                        setBorderColor('#4e0eff')
                        
                        return
                    }
                    setBorderColor('transparent')
                },10)
            }}
        >
            <Image
                source={{ uri: item.url }}
                style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: borderColor}}
            />
        </TouchableOpacity>
    )
};