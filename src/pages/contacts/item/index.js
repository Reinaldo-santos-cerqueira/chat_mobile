import { Image, Text, TouchableOpacity } from "react-native";

export const Item = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={{
                width: '100%',
                height: 100,
                backgroundColor: '#080420',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center',
                gap: 32,
                paddingLeft: 30,
                marginBottom: 30
            }}
            onPress={() => {
                const data = item
                navigation.navigate('Message', { datas: data })
            }}
        >
            <Image
                source={{ uri: item.avatarImage }}
                style={{height: 50,width: 50,borderRadius: 25}}
            />
            <Text
                style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 700
                }}
            >
                {item.username}
            </Text>
        </TouchableOpacity>
    )
};