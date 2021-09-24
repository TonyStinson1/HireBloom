import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'


export const Card = (props) => {
    return (
        <View style={{
            width: "100%",
            height: '100%',
            maxHeight: 152,
            borderRadius: 16,
            backgroundColor: "rgba(23, 162, 243 ,0.4)",
            padding: 10,
        }}>
            {props.icon &&
                <View style={{ alignItems: "flex-end", marginBottom: -20 }}>
                    <Icon
                        name='shield-airplane'
                        type="material-community"
                        color="rgb(69,181,245)"
                        size={28} />
                </View>
            }
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontWeight: "700",

                }}>{props.name}</Text>
            </View>

        </View>
    );
}
